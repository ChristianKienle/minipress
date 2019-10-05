// @ts-check
const fs = require('fs-extra')
const Path = require('path')
const { stringify } = require('@minipress/utils')
const createWebpack = require('webpack')
const { replacePrefix, readJson } = require('./utils')
const createHotMiddleware = require('webpack-hot-middleware')
const createDevMiddleware = require('webpack-dev-middleware')
const { createBundleRenderer } = require('vue-server-renderer')
// @ts-ignore
const createServer = require('polka')
const {
  runCompiler,
  logStats
} = require('./../utils/webpack')
const createTemplate = require('./template')
const Head = require('@minipress/head-element')
const getPageOutputFilepath = require('./get-page-output-filepath')

/** @typedef {import('vue-server-renderer').BundleRenderer} BundleRenderer */
/** @typedef {import('@minipress/types').EmittablePage} EmittablePage */

module.exports = class VueRenderer {
  /** @param{import('./../core/minipress/minipress')} minipress */
  constructor(minipress) {
    this.renderer = null
    this.minipress = minipress
  }

  get config() {
    return this.minipress.config
  }
  get log() {
    return this.minipress.log
  }

  /** @param {string} url */
  async createContext(url) {
    const head = new Head()
      .title('')
      .description('')
    await this.minipress.hooks.getHead.promise(head, url)

    return {
      xxx: 'chris',
      url,
      head: head.renderToString()
    }
  }

  async build() {
    await fs.emptyDir(this.config.dest)
    const client = await this.minipress.getWebpackConfig('client')
    const server = await this.minipress.getWebpackConfig('server')
    const clientCompiler = createWebpack(client)
    const serverCompiler = createWebpack(server)
    await Promise.all([
      runCompiler(clientCompiler),
      runCompiler(serverCompiler)
    ])
  }

  /** @param {{ pages: EmittablePage[]; outDir: string; dest: string }} options */
  async generate({ pages, outDir, dest }) {
    await fs.emptyDir(outDir)
    const serverBundle = readJson(
      this.serverBundlePath({ dest })
    )
    const clientManifest = readJson(
      this.clientManifestPath({ dest })
    )
    const renderer = this.initRenderer({ serverBundle, clientManifest })
    if (renderer == null) {
      throw Error('renderer should not be null here')
    }
    await Promise.all(
      pages.map(page => this.generatePage({ page, renderer, outDir }))
    )
    const destOutPath = Path.join(outDir)
    await fs.copy(dest, destOutPath)
  }

  /** @param {{ page: EmittablePage; renderer: BundleRenderer; outDir: string }} options */
  async generatePage({ page, renderer, outDir }) {
    const { path } = page
    if(path == null) {
      this.log.debug(`Cannot generate page ${stringify(page.file)} – path is null.`)
      return
    }
    const outputPath = getPageOutputFilepath(page, { outDir })
    if(outputPath == null) {
      this.log.debug(`Cannot generate page ${stringify(page.file)} – outputPath could not be determined.`)
      return
    }
    this.log.info(`${path} → ${outputPath}…`)
    const context = await this.createContext(path)
    const markup = await renderer.renderToString(context)
    const html = markup.replace('<div data-server-rendered="true">', '<div data-server-rendered="true" id="app">')
    this.log.info(`${path} generated (${html.length} bytes)`)
    const outPath = outputPath
    await fs.outputFile(outPath, html)
  }

  /**
   * @param {{serverBundle?: object, clientManifest?: object}} bundles
   */
  initRenderer({ serverBundle, clientManifest }) {
    if (serverBundle && clientManifest) {
      const template = createTemplate()
      // @ts-ignore
      this.renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest,
        inject: false,
        runInNewContext: false,
        shouldPrefetch: () => true,
        shouldPreload: (_, type) => type === 'script' || type === 'style',
        basedir: Path.resolve(__dirname, '..', 'dist-server')
      })
    }
    return this.renderer
  }

  /**
   * @param {createWebpack.Configuration} config
   * @returns {string}
   */
  _publicPathFromConfig(config) {
    const publicPath = config.output && config.output.publicPath
    if (publicPath != null) {
      return publicPath
    }
    throw Error('config.output.publicPath cannot be undefined/null')
  }

  /** @param {{ dest: string }} options */
  clientManifestPath({ dest }) {
    return Path.resolve(dest, 'vue-ssr-client-manifest.json')
  }

  /** @param {{ dest: string }} options */
  serverBundlePath({ dest }) {
    return Path.resolve(dest, 'vue-ssr-server-bundle.json')
  }

  /** @param {{ dest: string }} options */
  async getRequestHandler({ dest }) {
    const clientConfig = await this.minipress.getWebpackConfig('client')
    const serverConfig = await this.minipress.getWebpackConfig('server')

    const server = createServer()

    /** @type {createWebpack.Configuration} */
    // @ts-ignore
    clientConfig.plugins.push(new createWebpack.HotModuleReplacementPlugin())
    const clientCompiler = createWebpack(clientConfig)
    const devMiddleware = createDevMiddleware(clientCompiler, {
      logLevel: 'silent',
      publicPath: this._publicPathFromConfig(clientConfig)
    })

    const hotMiddleware = createHotMiddleware(clientCompiler, { log: false })
    clientCompiler
      .hooks
      .done
      .tap('minipress-requestHandler', stats => {
        logStats(stats, { log: this.log, level: 'errors-only' })
      })

    const serverCompiler = createWebpack(serverConfig)
    // @ts-ignore
    const mfs = new createWebpack.MemoryOutputFileSystem()
    serverCompiler.outputFileSystem = mfs

    /** @type {object=} */
    let serverBundle
    /** @type {object=} */
    let clientManifest

    serverCompiler.hooks.done.tap('minipress-requestHandler', stats => {
      if (stats.hasErrors()) {
        logStats(stats, { log: this.log, level: 'errors-only' })
        return
      }
      serverBundle = readJson(this.serverBundlePath({ dest }), mfs.readFileSync.bind(mfs))
      this.initRenderer({ serverBundle, clientManifest })
    })

    clientCompiler.hooks.done.tap('init-renderer', stats => {
      if (stats.hasErrors()) {
        logStats(stats, { log: this.log, level: 'errors-only' })
        return
      }
      clientManifest = readJson(
        this.clientManifestPath({ dest }),
        // @ts-ignore
        clientCompiler.outputFileSystem.readFileSync.bind(
          clientCompiler.outputFileSystem
        )
      )
      this.initRenderer({ serverBundle, clientManifest })
    })
    serverCompiler.watch({}, () => { })

    server.use(devMiddleware)
    server.use(hotMiddleware)

    server.get('*', async (
      /** @type {any} */ req,
      /** @type {any} */ res
    ) => {
      if (!req.headers.accept || !req.headers.accept.includes('text/html')) {
        res.statusCode = 404
        return res.end('404')
      }

      const { renderer } = this
      if (renderer == null) {
        return res.end('Please wait for compilation and refresh..')
      }

      const render = async () => {
        // Replace the base with /. Somehow this is needed.
        // If req.url is /minipress/config then replacePrefix will yield
        // /config. We could probably work around this by fixing the routes or something…
        const url = replacePrefix(req.url, this.config.build.base, '/')
        this.log.info(`Rendering page ${url}`)
        const context = await this.createContext(url)
        const markup = await renderer.renderToString(context)

        const html = markup.replace('<div data-server-rendered="true">', '<div data-server-rendered="true" id="app">')
        res.setHeader('content-type', 'text/html')
        res.end(html)
      }
      return render()
    })
    return server.handler
  }
}
