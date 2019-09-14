// @ts-check
const fs = require('fs-extra')
const Path = require('path')
const createWebpack = require('webpack')
const readJSON = (file, readFile = fs.readFileSync) => JSON.parse(readFile(file, 'utf8'))
const createHotMiddleware = require('webpack-hot-middleware')
const createDevMiddleware = require('webpack-dev-middleware')
const createServer = require('polka')
const {
  runCompiler,
  logStats
} = require('./../utils/webpack')

/** @typedef {import('vue-server-renderer').BundleRenderer} BundleRenderer */

module.exports = class VueRenderer {
  /**
   * @typedef {object} Options
   * @prop {import('./../core/webpack-config')} webpack
   * @prop {import('@minipress/log/src/logger')} log
   * @prop {import('./../config/config')} config
   */
  /** @param {Options} options */
  constructor({ webpack, log, config }) {
    this.config = config
    this.log = log
    this.webpack = webpack
    this.renderer = null
  }

  async build() {
    await fs.emptyDir(this.config.dest)
    const { client, server } = this.webpack.configs()
    const clientCompiler = createWebpack(client)
    const serverCompiler = createWebpack(server)
    await Promise.all([
      runCompiler(clientCompiler),
      runCompiler(serverCompiler)
    ])
  }

  /** @param {{ pages: Page[]; outDir: string; dest: string }} options */
  async generate({ pages, outDir, dest }) {
    await fs.emptyDir(outDir)
    const serverBundle = readJSON(
      this.serverBundlePath({ dest })
    )
    const clientManifest = readJSON(
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

  /** @typedef {import('./../core/page')} Page */
  /** @param {{ page: Page; renderer: BundleRenderer; outDir: string }} options */
  async generatePage({ page, renderer, outDir }) {
    const { path } = page
    const outputPath = page.outputFilePath({ outDir })
    this.log.info(`Generating ${path}…`)
    const context = { url: path }
    const markup = await renderer.renderToString(context)
    const initialDocumentData = require('./get-initial-document-data')(
      context
    )
    context.documentData = initialDocumentData
    const html = markup.replace('<div data-server-rendered="true">', '<div data-server-rendered="true" id="app">')
    this.log.info(`${path} generated (${html.length} bytes)`)
    const outPath = outputPath
    await fs.outputFile(outPath, html)
  }

  initRenderer({ serverBundle, clientManifest }) {
    const { createBundleRenderer } = require('vue-server-renderer')

    if (serverBundle && clientManifest) {
      const template = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body><!--vue-ssr-outlet--></body>
  </html>`
      // @ts-ignore
      this.renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest,
        runInNewContext: true,
        shouldPrefetch: () => true,
        shouldPreload: (file, type) => type === 'style',
        basedir: Path.resolve(__dirname, '..', 'dist-server')
      })
    }
    return this.renderer
  }

  /** @param {createWebpack.Configuration} config */
  /** @returns {string} */
  _publicPathFromConfig(config) {
    // return this.config.build.publicUrl
    const { publicPath = null } = (config.output || {})
    if (publicPath != null) {
      return publicPath// + '_minipress/'
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
  getRequestHandler({ dest }) {
    const server = createServer()
    /** @type {createWebpack.Configuration} */
    const clientConfig = this.webpack.client.toConfig()
    // @ts-ignore
    clientConfig.plugins.push(new createWebpack.HotModuleReplacementPlugin())
    const clientCompiler = createWebpack(clientConfig)
    const devMiddleware = createDevMiddleware(clientCompiler, {
      logLevel: 'silent',
      publicPath: this._publicPathFromConfig(clientConfig)
    })

    const hotMiddleware = createHotMiddleware(clientCompiler, {
      log: false
    })
    clientCompiler.hooks.watchRun.tap('saber-serve', () => {
      // event.emit('rebuild')
    })
    clientCompiler
      .hooks
      .done
      .tap('minipress-requestHandler', stats => {
        logStats(stats, { log: this.log, level: 'errors-only' })
      })

    const serverConfig = this.webpack.server.toConfig()
    const serverCompiler = createWebpack(serverConfig)
    // @ts-ignore
    const mfs = new createWebpack.MemoryOutputFileSystem()
    serverCompiler.outputFileSystem = mfs

    let serverBundle
    let clientManifest

    serverCompiler.hooks.done.tap('minipress-requestHandler', stats => {
      if (stats.hasErrors()) {
        logStats(stats, { log: this.log, level: 'errors-only' })
        return
      }
      serverBundle = readJSON(this.serverBundlePath({ dest }), mfs.readFileSync.bind(mfs))
      this.initRenderer({ serverBundle, clientManifest })
    })

    clientCompiler.hooks.done.tap('init-renderer', stats => {
      if (stats.hasErrors()) {
        logStats(stats, { log: this.log, level: 'errors-only' })
        return
      }
      clientManifest = readJSON(
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

    server.get('*', async (req, res) => {
      if (!req.headers.accept || !req.headers.accept.includes('text/html')) {
        res.statusCode = 404
        return res.end('404')
      }

      if (!this.renderer) {
        return res.end('Please wait for compilation and refresh..')
      }

      const render = async () => {
        this.log.info(`Rendering page ${req.url}`)

        const context = {
          url: req.url.replace(this.config.build.base, '/')
        }
        const markup = (this.renderer
          ? await this.renderer.renderToString(context)
          : '$&')
        const html = markup.replace('<div data-server-rendered="true">', '<div data-server-rendered="true" id="app">')
        res.setHeader('content-type', 'text/html')
        res.end(html)
      }
      return render()
    })
    return server.handler
  }
}
