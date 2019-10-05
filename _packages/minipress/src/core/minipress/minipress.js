// @ts-check
const TempDir = require('./temp-dir')
const Components = require('./components')
const Layouts = require('./layouts')
const Plugins = require('./plugins')
const Path = require('path')
const { AsyncSeriesHook } = require('tapable')
const codeGen = require('@minipress/code-gen')
const createRoutes = require('./create-routes')
const Transformers = require('./transformers')
const Pages = require('./pages')
const Aliases = require('./aliases')
const DynamicModules = require('./dynamic-modules')
const AppEnhancers = require('./app-enhancers')
const PageTransformers = require('./page-transformers')
const { VueRenderer } = require('./../../vue-renderer')
const { setNodeEnv } = require('@minipress/utils')
const Joi = require('@hapi/joi')
const {
  createBaseConfig,
  createServerConfig,
  createClientConfig
} = require('./../../webpack')
const http = require('http')
const PageMutations = require('./page-mutations')
const ContentComponents = require('./content-components')

/**
 * @typedef {import('@minipress/types').Page} Page
 *
 * @typedef {object} Options
 * @prop {import('@minipress/types')._Config} config
 * @prop {import('@minipress/log')} log
 */
class Minipress {
  /**
   * @param {Options} options
   */
  constructor({ config, log }) {
    this.hooks = {
      // Called as early as possible:
      // A minipress.config.js can expose a apply(…) function that gives
      // the user a chance to register for hooks pretty early on.
      // applyConfig: new AsyncSeriesHook(),
      // Called right at the start of the run(…)-method
      beforeRun: new AsyncSeriesHook(),
      // Called right before a webpack config is requested.
      // This allows you to modify to webpack chain before it is used
      // to create the actual config object.
      // chain: A webpack chain
      // type: either 'client' or 'server'
      chainWebpack: new AsyncSeriesHook(['chain', 'type']),
      // config: A webpack config object
      // type: either 'client' or 'server'
      getWebpackConfig: new AsyncSeriesHook(['config', 'type']),

      // Called during the render process (vue-renderer)
      // This is called multiple times so it should not take a lot of time to compute
      // the head. Each iteration of getHead(…) begins with a new head-instance.
      // Last one wins.
      getHead: new AsyncSeriesHook([
        'head', // instance of @minipress/head-element
        'page' // a page - currently the page is just the req.url (TODO)
      ]),
      // Called multiple times – each time with a fresh empty object.
      // Each plugin simply should mutate the object.
      configureSiteData: new AsyncSeriesHook(['siteData']),
      emitSiteData: new AsyncSeriesHook(['siteData']),
      // Called as soon miniPress wants to have the initial set of pages – called only once
      initialPages: new AsyncSeriesHook(),
      registerDynamicModules: new AsyncSeriesHook(),
      emitDynamicModules: new AsyncSeriesHook(),
      registerAppEnhancers: new AsyncSeriesHook(),
      registerAliases: new AsyncSeriesHook(),
      registerComponents: new AsyncSeriesHook(),
      registerTransformers: new AsyncSeriesHook(),
      registerContentComponents: new AsyncSeriesHook(),
      emitContentComponents: new AsyncSeriesHook(),
      registerLayouts: new AsyncSeriesHook(),
      emitPages: new AsyncSeriesHook(),
      emitRoutes: new AsyncSeriesHook(),
      mutatePages: new AsyncSeriesHook(['mutations']),
      // This is called the moment a new page has been created.
      onCreatePage: new AsyncSeriesHook(['page']),
      onRemovePage: new AsyncSeriesHook(['page']),
      // This is called once multiple pages have been created.
      onCreatePages: new AsyncSeriesHook([]),
      configureMarkdownRenderer: new AsyncSeriesHook(['markdownRenderer']),
      // called before plugins are applied
      // applying a plugin simply calls its 'apply(…)'-function
      // This is your last chance to register more plugins
      beforePlugins: new AsyncSeriesHook(),
      // called after plugins are applied.
      // This is useful to hook into Minpress and (more or less) ensure that
      // you are the last one being invoked on a certain hook.
      // It cannot be garantueed since you can do almost anything with our
      // hooks – but well – this is our best bet.
      afterPlugins: new AsyncSeriesHook()
    }
    this.plugins = new Plugins()
    this.config = config
    this.log = log
    this.tempDir = new TempDir({ path: config.tempDir })
    this._initialized = false
    this.components = new Components()
    this.contentComponents = new ContentComponents()
    this.layouts = new Layouts()
    this.transformers = new Transformers()
    this.pages = new Pages(this)
    this.aliases = new Aliases(this)
    this.dynamicModules = new DynamicModules(this)
    this.appEnhancers = new AppEnhancers(this)
    this.watch = true
    this.pageTransformers = new PageTransformers()
    this.aliases.register('#minipress/site-data', this.tempDir.resolveTemp('site-data/index.js'))
    this.hooks.emitSiteData.tapPromise('minipress', async siteData => {
      const pages = this.pages.values()//.map(page => page)
      const _siteData = {
        pages: pages.map(page => this.pages.makePageAvailableToClient(page)),
        ...siteData,
      }
      const code = codeGen.js(c => `export default ${c.stringify(_siteData)}`)
      this.tempDir.writeTemp('site-data/index.js', code)
    })
    this.vueRenderer = new VueRenderer(this)
    this.hooks.afterPlugins.tapPromise('minipress-ctor', async () => {
      this.hooks.onRemovePage.tapPromise('minipress ctor', async page => {
        this.contentComponents.remove(page.key)
        await this.emitRoutes()
        await this.emitContentComponents()
      })
    })
  }

  get joi() {
    return Joi
  }

  async getSiteData() {
    const siteData = {}
    await this.hooks.configureSiteData.promise(siteData)
    await this.hooks.emitSiteData.promise(siteData)
    return siteData
  }
  /**
   * @param {'client' | 'server'} type
   */
  async getWebpackConfig(type) {
    const { config } = this
    const { dest } = config
    const baseOptions = {
      dest,
      isServer: type === 'server',
      minipressConfig: this.config
    }
    const base = createBaseConfig(baseOptions)
    const chain = type === 'server' ? createServerConfig(base, baseOptions) : createClientConfig(base, baseOptions)

    // Inform our plugins about the chain
    await this.hooks.chainWebpack.promise(chain, type)

    // Now create the actual webpack config and inform all plugins
    const webpackConfig = chain.toConfig()
    await this.hooks.getWebpackConfig.promise(webpackConfig, type)
    return webpackConfig
  }

  /**
   * @typedef {object} GenerateOptions
   * @prop {('development' | 'production')=} [mode=production]
   * @prop {string} outDir
   *
   * @param {GenerateOptions} options
   */
  async generate({ outDir, mode = 'production' }) {
    this.watch = false
    setNodeEnv(mode)
    await this.prepare()
    await this.run()
    const { vueRenderer } = this
    await vueRenderer.build()
    const pages = this.pages.values()
    const dest = this.config.dest
    await vueRenderer.generate({ pages, outDir, dest })
  }
  /**
   * @typedef {object} ServeOptions
   * @prop {boolean=} [watch=true]
   * @prop {('development' | 'production')=} [mode=development]
   * @prop {number} port
   * @prop {string} host
   *
   * @param {ServeOptions} options
   */
  async dev({
    port,
    host,
    watch = true,
    mode = 'development'
  }) {
    this.watch = watch
    setNodeEnv(mode)
    await this.prepare()
    const { vueRenderer, log } = this
    try {
      const requestHandler = await vueRenderer.getRequestHandler({ dest: this.config.dest })
      const server = http.createServer(requestHandler)
      server.listen(port, host, () => {
        log.info(`minipress is running on http://${host}:${port}`)
      })
    } catch (err) {
      log.error(`Error during runCompiler: ${err}`)
    }
    await this.run()
  }

  // Everything that needs to be done exactly once goes into prepare(…)
  async prepare() {
    this.cleanTempDir()

    // Register default Theme
    this.use(require('@minipress/theme-default'))
    this.use(require('@minipress/plugin-pages'))
    this.use(require('@minipress/plugin-layouts'))
    this.use(require('@minipress/plugin-components'))

    // Register default Transformers
    this.use(require('@minipress/plugin-format-markdown'))
    this.use(require('@minipress/plugin-format-vue'))

    // Plugins from Config
    this.config.plugins.forEach(plugin => {
      this.use(...plugin)
    })

    this.hooks.afterPlugins.tapPromise('minipress-prepare', async () => {
      this.hooks.onCreatePage.tapPromise('minipress-prepare', async page => {
        await this.pages._emitPage(page)
      })
      this.hooks.registerContentComponents.tapPromise('minipress-prepare - routes', async () => {
        const pages = this.pages.values()
        pages.forEach(route => {
          const { file } = route
          const { absolute } = file
          if (absolute == null) {
            return
          }
          this.contentComponents.register(route.key, { id: route.key, absolutePath: absolute })
        })
      })

      this.hooks.emitRoutes.tapPromise('minipress-prepare', async () => {
        await this.emitRoutes()
      })
    })

    // Give minipress.config.js a chance to do something
    await this.config.apply(this)

    // tell everyone that we are about to apply all plugins
    await this.hooks.beforePlugins.promise()
    await this.applyPlugins()
    await this.hooks.afterPlugins.promise()

    // Give plugins a chance to register transformers
    await this.hooks.registerTransformers.promise()

    this._enableUniversalPageLoaderSupport()
    this.pages.createAlias()

    const aliases = ['app-enhancers', 'async-data', 'content-components', 'layouts', 'routes', 'components', 'site-data']
    aliases.forEach(alias => {
      const name = `#minipress/${alias}`
      const path = this.tempDir.resolveTemp(`${alias}/index.js`)
      // writeTemp(…) returns the absolute path for the relative
      // path passed as the first argument.
      this.aliases.register(name, path)
    })

    // Setup Default Theme + Layouts
    const defaultThemePath = require.resolve('@minipress/theme-default/package.json')
    const defaultLayoutPath = Path.join(Path.dirname(defaultThemePath), 'src', 'layouts', 'default.vue')
    this.layouts.register('default', defaultLayoutPath)
    await this.hooks.registerLayouts.promise()
    this.emitToLayouts()

    await this.hooks.registerAppEnhancers.promise()
    this.appEnhancers.emit()
    await this.hooks.registerDynamicModules.promise()
    await this.hooks.emitDynamicModules.promise()

    await this.hooks.registerAliases.promise()
    await this.hooks.registerComponents.promise()
    await this.hooks.registerContentComponents.promise()

    this.emitComponents()
    this.emitContentComponents()
  }

  /**
   * @param {string | any} id
   * @param {any=} options
   */
  use(id, options) {
    this.plugins.use(id, options)
  }

  applyPlugins() {
    return this.plugins.applyPlugins(this)
  }

  _enableUniversalPageLoaderSupport() {
    /** @param {import('webpack-chain')} config */
    const enableFor = config => {
      // FIXME
      const VueLoaderOptions = { extractCSS: false }

      const supportedExtensions = ['minipresspage', 'md', 'vue']
      const pageExtensions = supportedExtensions
        .map(ext => new RegExp(`\\.${ext}$`))

      config
        .module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader('vue-loader')
        .options(VueLoaderOptions)
        .end()
        .use('minipress-page-loader')
        .loader(require.resolve('./universal-page-loader'))
        .options({
          minipress: this
        }).end()

      config.module
        .rule('minipress-page')
        .test(pageExtensions)
        // @ts-ignore
        .resourceQuery(query => /minipresspage/.test(query))
        .use('vue-loader')
        .loader('vue-loader')
        .options(VueLoaderOptions)
        .end()
        .use('minipress-page-loader')
        .loader(require.resolve('./universal-page-loader'))
        .options({
          minipress: this
        }).end()

      // Handle `<page-prop>` block in .vue file
      config.module
        .rule('page-prop')
        .type('javascript/auto')
        // @ts-ignore
        .resourceQuery(/blockType=page-prop/)
        .use('page-prop-loader')
        .loader(require.resolve('./page-prop-loader'))
        .options({
          minipress: this
        })

      config.module
        .rule('layout-block')
        .type('javascript/auto')
        // @ts-ignore
        .resourceQuery(/blockType=layout/)
        .use('layout-block-loader')
        .loader(require.resolve('./layout-block-loader'))
        .options({
          minipress: this
        })

    }

    this.hooks.chainWebpack.tapPromise('_enableUniversalPageLoaderSupport', async config => {
      enableFor(config)
    })
  }

  cleanTempDir() {
    const { tempDir, log } = this
    this.tempDir.clean()
    log.actionSucceed(`Cleaned temporary directory at '${tempDir.path}'`)
  }

  /** @param {Page} page */
  async addPage(page) {
    return await this.pages.createPage(page)
  }

  /**
   * @param {string} key
   */
  async removePage(key) {
    return await this.pages.removePage(key)
  }

  /**
   * @param {(page: Page)=>boolean} condition
   */
  async removePageWhere(condition) {
    return await this.pages.removePageWhere(condition)
  }

  /**
   *
   * @param {string} alias
   * @param {string} content
   * @param {{path: string}} [options={path: 'index.js'}]
   */
  _writeToAlias(alias, content, options = { path: 'index.js' }) {
    const path = `${alias}/${options.path}`
    return this.tempDir.writeTemp(path, content)
  }

  /**
   * @param {string} pageKey
   * @param {object} content
   */
  _writeAsyncData(pageKey, content) {
    const code = codeGen.js(c => `export default () => (${c.stringify(content)})`)
    this._writeToAlias('async-data', code, { path: `${pageKey}.js` })
  }

  /**
   * @typedef {object} RunOptions
   * @prop {boolean} watch
   */
  async run() {
    this.log.info(`Using publicUrl: ${this.config.build.base}`)
    await this.hooks.beforeRun.promise()

    this.hooks.emitPages.tapPromise('builtin:pages:emitPages', async () => {
      await this.pages.emit()
    })

    this.emitComponents()
    const defaultThemePath = require.resolve('@minipress/theme-default/package.json')
    const defaultLayoutPath = Path.join(Path.dirname(defaultThemePath), 'src', 'layouts', 'default.vue')
    this.layouts.register('default', defaultLayoutPath)
    await this.hooks.registerLayouts.promise()
    this.emitToLayouts()

    await this.hooks.initialPages.promise()
    const mutations = new PageMutations()
    await this.hooks.mutatePages.promise(mutations)
    await mutations.execute(this)
    await this.hooks.registerContentComponents.promise()
    await this.hooks.emitContentComponents.promise()
    this.emitContentComponents()
    await this.hooks.emitPages.promise()
    await this.getSiteData()
  }

  // Components
  emitComponents() {
    this.tempDir.writeTemp('components/index.js', this.components.code)
  }

  // async emitRoutes() {
  //   await this.hooks.registerContentComponents.promise()
  //   await this.hooks.emitContentComponents.promise()
  //   this.emitContentComponents()
  //   const { code } = createRoutes(this.pages.values())
  //   this.tempDir.writeTemp('routes/index.js', code)
  // }

  async emitRoutes() {
    await this.hooks.registerContentComponents.promise()
    await this.hooks.emitContentComponents.promise()
    this.emitContentComponents()
    const { code } = createRoutes(this.pages.values())
    this.tempDir.writeTemp('routes/index.js', code)
  }

  emitContentComponents() {
    this.tempDir.writeTemp('content-components/index.js', this.contentComponents.code)
  }

  emitToLayouts() {
    this.tempDir.writeTemp('layouts/index.js', this.layouts.code)
  }
}

module.exports = Minipress
