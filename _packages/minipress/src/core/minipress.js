// @ts-check
const Components = require('./components')
const Layouts = require('./layouts')
const Plugins = require('./plugins')
const Path = require('path')
const { AsyncSeriesHook, AsyncSeriesWaterfallHook } = require('tapable')
const codeGen = require('@minipress/code-gen')
const createRoutes = require('./create-routes')
const Transformers = require('./transformers')
const Pages = require('./pages')
const Aliases = require('./aliases')
const DynamicModules = require('./dynamic-modules')
const AppEnhancers = require('./app-enhancers')
const PageTransformers = require('./page-transformers')
const { VueRenderer } = require('./../vue-renderer')
const { setNodeEnv, TempDir } = require('@minipress/utils')
const Joi = require('@hapi/joi')
const {
  createBaseConfig,
  createServerConfig,
  createClientConfig
} = require('./../webpack')
const http = require('http')
const PageMutations = require('./page-mutations')
const ContentComponents = require('./content-components')
const helmet = require('helmet')
const Config = require('@minipress/config')
const normalizeConfig = Config.normalize.normalizeConfig

/**
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').PagesI} PagesI
 * @typedef {object} Options
 * @prop {import('@minipress/types')._Config} config
 * @prop {import('@minipress/log')} log
 * @prop {import('@minipress/cli')} cli
 */
class Minipress {
  /**
   * @param {Options} options
   */
  constructor({ config, log, cli }) {
    this.pluginsPrepared = false

    this.hooks = {
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
      getWebpackConfig: new AsyncSeriesWaterfallHook(['config', 'type']),

      // Called during the render process (vue-renderer)
      // This is called multiple times so it should not take a lot of time to compute
      // the head. Each iteration of getHead(…) begins with a new head-instance.
      // Last one wins.
      getHead: new AsyncSeriesHook([
        'head', // instance of @minipress/head-element
        'page', // a page - currently the page is just the req.url (TODO)
        'minipress' // the minipress instance (useful for accessing the config)
      ]),
      // Called multiple times – each time with a fresh empty object.
      // Each plugin simply should mutate the object.
      configureSiteData: new AsyncSeriesHook(['siteData']),
      emitSiteData: new AsyncSeriesHook(['siteData']),
      // Called as soon miniPress wants to have the initial set of pages – called only once
      initialPages: new AsyncSeriesHook(),
      registerDynamicModules: new AsyncSeriesHook(),
      vuePreloaders: new AsyncSeriesHook(['preloaders']),
      emitDynamicModules: new AsyncSeriesHook(),
      registerAppEnhancers: new AsyncSeriesHook(),
      registerAliases: new AsyncSeriesHook(),
      // Called when components will be registered.
      // Arguments:
      // - components: Instance of Components (ComponentsI)
      registerComponents: new AsyncSeriesHook(['components']),
      registerGlobalComponents: new AsyncSeriesHook(),
      // A transformer is responsible for handling files of a specific content type (e.g.: vue or markdown-files)
      registerTransformers: new AsyncSeriesHook(),
      // A page transformer is able to transform a page
      // after it has already been normalized and processed by the "regular transformers" (see above)
      registerPageTransformers: new AsyncSeriesHook(),
      registerContentComponents: new AsyncSeriesHook(),
      emitContentComponents: new AsyncSeriesHook(),
      registerLayouts: new AsyncSeriesHook(),
      extendCli: new AsyncSeriesHook(),
      // Instance of Pages
      emitPages: new AsyncSeriesHook(['pages']),
      emitRoutes: new AsyncSeriesHook(),
      mutatePages: new AsyncSeriesHook(['mutations']),
      configureRequestServer: new AsyncSeriesHook(['server']),
      afterGenerate: new AsyncSeriesHook(),
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

    // TODO: Make configurable
    if (process.env.MP_LOG_HOOKS === 'true') {
      Object.entries(this.hooks).forEach(([name, hook]) => {
        hook.intercept({
          call: () => {
            this.log.debug('call hook %s', name)
          }
        })
      })
    }

    this.plugins = new Plugins()
    this.config = config
    this._config = normalizeConfig()
    this.cli = cli
    this.log = log
    this.tempDir = new TempDir({ path: config.tempDir })
    this._initialized = false
    this.globalComponents = /** @type {import('@minipress/types').ComponentsI} */(new Components())
    this.components = /** @type {import('@minipress/types').ComponentsI} */(new Components())
    this.contentComponents = new ContentComponents()
    this.layouts = new Layouts()
    this.transformers = new Transformers()
    this.pageTransformers = new PageTransformers()
    this.aliases = new Aliases()
    this.pages = new Pages({
      aliases: this.aliases,
      pageTransformers: this.pageTransformers,
      transformers: this.transformers,
      tempDir: this.tempDir,
      contentComponents: this.contentComponents
    })
    this.dynamicModules = new DynamicModules(this)
    this.appEnhancers = new AppEnhancers(this)
    this.watch = true
    this.aliases.register('#minipress/site-data', this.tempDir.resolveTemp('site-data/index.js'))
    this.vueRenderer = new VueRenderer(this)

    this.hooks
      .chainWebpack
      .tapPromise('@minipress/internal-plugin-aliases',
        /** @param {import('webpack-chain')} config */
        async config => {
          this.aliases.addToConfig(config)
        })

    this.hooks.afterPlugins.tapPromise('minipress-ctor', async () => {
      this.hooks.initialPages.tapPromise('minipress-ctor-pages', async () => {
        await this.getSiteData()
        await this.hooks.emitPages.promise(this.pages)
        await this.hooks.emitRoutes.promise()
      })

      this.hooks.emitSiteData.tapPromise('minipress', async siteData => {
        const pages = this.pages.values()
        const _siteData = {
          pages: pages.map(page => this.pages.makePageAvailableToClient(page)),
          ...siteData,
        }
        const code = codeGen.js(c => `export default ${c.stringify(_siteData)}`)
        this.tempDir.writeTemp('site-data/index.js', code)
      })
      this.hooks.onRemovePage.tapPromise('minipress ctor', async page => {
        this.contentComponents.remove(page.key)
        await this.emitRoutes()
        await this.emitContentComponents()
      })
    })
    this.hooks.configureRequestServer.tapPromise('minipress', async server => {
      server.use(helmet())
    })
  }

  // Public API
  /**
   * @param {string} id
   * @param {string} path
   */
  registerComponent(id, path) {
    this.components.register(id, path)
  }

  /**
   * @param {string} id
   * @param {string} path
   */
  registerLayout(id, path) {
    this.layouts.register(id, path)
  }

  /**
   * @param {string} name
   * @param {string} path
   */
  registerAlias(name, path) {
    this.aliases.register(name, path)
  }

  /**
   * @param {string} name
   * @param {string} code
   */
  registerDynamicModule(name, code) {
    this.dynamicModules.register(name, code)
  }

  /** @param {string} code */
  addAppEnhancer(code) {
    this.appEnhancers.add(code)
  }

  get joi() {
    return Joi
  }

  /** @param {Page} page */
  async addPage(page) {
    const _page = await this.pages.createPage(page)
    await this.hooks.onCreatePage.promise(_page)
    return _page
  }

  /** @param {string} key */
  async removePage(key) {
    return await this.pages.removePage(key)
  }

  /** @param {(page: Page)=>boolean} condition */
  async removePageWhere(condition) {
    return await this.pages.removePageWhere(condition)
  }

  // Misc
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
    const options = {
      dest,
      isServer: type === 'server',
      minipressConfig: this.config
    }
    const createBase = () => createBaseConfig(options)

    const chain = type === 'server' ? createServerConfig(createBase(), options) : createClientConfig(createBase(), options)

    // Inform our plugins about the chain
    await this.hooks.chainWebpack.promise(chain, type)

    // Now create the actual webpack config and inform all plugins
    const webpackConfig = chain.toConfig()
    const modifiedConfig = await this.hooks.getWebpackConfig.promise(webpackConfig, type)
    return modifiedConfig
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
    await this.hooks.afterGenerate.promise()
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
        log.info(`minipress is running on http://${host}:${port}${this.config.build.base}`)
      })
    } catch (err) {
      log.error(`Error during runCompiler: ${err}`)
    }
    await this.run()
  }

  // This method is doing a lot. In order to understand why this method exists (and is exposed) it is good to know what it actually does:
  // 1. It registered the built-in plugins that are required to make everything work.
  // 2. Plugins defined in the config file are also registered.
  // 3. This method also registeres itself for certain hooks that are important and should be registered after all plugins did their stuff.
  // 4. It then calls config.apply(this) – TODO: remove that feature.
  // 5. Then all plugins are applied
  // 6. Then the extendCli hook is invoked
  // Now we could ask ourselves: Why on earth do we have this method at all? In theory we could also just shove everything into the prepare-method.
  // The reason is the CLI integration.
  // You can use miniPress directly (by using its API) or by using the CLI.
  // You can extend the cli via plugins. Not every command registered will want to call prepare() – which does a lot. This is why those two things are seperated.
  async preparePlugins() {
    // We have to clean very early – otherwise everything we did in config.apply(…) will be deleted again. Yucks!
    this.cleanTempDir()

    // Register the built-in-components (Content, Link, …)
    this.use(require('@minipress/plugin-built-in-components'))
    // Register default Theme
    this.use(require('@minipress/theme-default'))
    // Register our core features
    this.use(require('@minipress/plugin-layouts'))
    this.use(require('@minipress/plugin-components'))
    this.use(require('@minipress/plugin-pages'))
    // Register default Transformers
    this.use(require('@minipress/plugin-format-markdown'))
    this.use(require('@minipress/plugin-format-vue'))
    // Register core cli extensiond
    this.use(require('@minipress/plugin-command-dev'))
    this.use(require('@minipress/plugin-command-generate'))
    this.use(require('@minipress/plugin-command-serve'))
    // Plugins from Config
    this.config.plugins.forEach(plugin => {
      this.use(plugin)
    })

    this.hooks.afterPlugins.tapPromise('minipress-prepare', async () => {
      this.hooks.emitPages.tapPromise('builtin:pages:emitPages', async pages => {
        await pages.emit()
      })

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

      await this.hooks.registerGlobalComponents.promise()

      this.hooks.emitRoutes.tapPromise('minipress-prepare', async () => {
        await this.emitRoutes()
      })
    })

    // Give minipress.config.js a chance to do something
    // Calling apply(…) before any plugins are actually registered
    // means that anything added via plugins (support for markdown, vue, …)
    // won't work within your apply(…) method.
    // This is why you should always write a plugin instead of using apply(…).
    await this.config.apply(this)

    // tell everyone that we are about to apply all plugins
    await this.hooks.beforePlugins.promise()
    await this.applyPlugins()
    await this.hooks.afterPlugins.promise()

    // Ask everyone to extend the CLI
    await this.hooks.extendCli.promise()

    // Mark as prepared
    this.pluginsPrepared = true
  }

  _assertThatPluginsArePrepared() {
    if(this.pluginsPrepared === false) {
      throw Error('You have to call \'preparePlugins()\' once before you interact with the miniPress API.')
    }
  }

  // Everything that needs to be done exactly once goes into prepare(…)
  // This method expects preparePlugins to be called first
  async prepare() {
    this._assertThatPluginsArePrepared()

    // Give plugins a chance to register transformers
    await this.hooks.registerTransformers.promise()
    // Give plugins a chance to register page-level transformers
    await this.hooks.registerPageTransformers.promise()

    await this._enableUniversalPageLoaderSupport()
    this.pages.createAlias()

    const aliases = ['app-enhancers', 'async-data', 'content-components', 'layouts', 'routes', 'components', 'site-data']
    aliases.forEach(alias => {
      const name = `#minipress/${alias}`
      const path = this.tempDir.resolveTemp(`${alias}/index.js`)
      // writeTemp(…) returns the absolute path for the relative
      // path passed as the first argument.
      this.aliases.register(name, path)
    })

    this.aliases.register('@@', this.config.cwd)

    // Setup Default Theme + Layouts
    const defaultThemePath = require.resolve('@minipress/theme-default/package.json')
    const defaultLayoutPath = Path.join(Path.dirname(defaultThemePath), 'src', 'layouts', 'default.vue')
    this.layouts.register('default', defaultLayoutPath)
    await this.hooks.registerLayouts.promise()
    this.emitToLayouts()

    await this.hooks.registerAppEnhancers.promise()
    const globalImports = this.globalComponents.paths.map(path => `import '${path}'`)
    this.appEnhancers.add(`
    ${globalImports.join('\n')}
    export default () => {}
    `)
    this.appEnhancers.emit()
    await this.hooks.registerDynamicModules.promise()
    await this.hooks.emitDynamicModules.promise()

    await this.hooks.registerAliases.promise()
    await this.hooks.registerComponents.promise(this.components)
    await this.hooks.registerContentComponents.promise()

    this.emitComponents()
    this.emitContentComponents()
  }

  /** @param {import('@minipress/types').ConfigPlugin} plugin */
  use(plugin) {
    this.plugins.use(plugin)
  }

  applyPlugins() {
    return this.plugins.applyPlugins(this)
  }

  async _enableUniversalPageLoaderSupport() {
    /** @param {import('webpack-chain')} config */
    const enableFor = async config => {
      const VueLoaderOptions = { extractCSS: false }

      const supportedExtensions = ['minipresspage', 'md', 'vue']
      const pageExtensions = supportedExtensions
        .map(ext => new RegExp(`\\.${ext}$`))

      const vuePreloaders = []
      await this.hooks.vuePreloaders.promise(vuePreloaders)

      const ruleVue = config.module.rule('vue')

      ruleVue
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

      vuePreloaders.forEach(({ use, loader, options = {} }) => {
        ruleVue.use(use).loader(loader).options(options).end()
      })

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

  /**
   * @param {string} alias
   * @param {string} content
   * @param {{path: string}} [options={path: 'index.js'}]
   */
  _writeToAlias(alias, content, options = { path: 'index.js' }) {
    const path = `${alias}/${options.path}`
    return this.tempDir.writeTemp(path, content)
  }

  /**
   * @typedef {object} RunOptions
   * @prop {boolean} watch
   */
  async run() {
    this._assertThatPluginsArePrepared()

    this.log.info(`Using publicUrl: ${this.config.build.base}`)
    await this.hooks.beforeRun.promise()

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
    await this.hooks.emitPages.promise(this.pages)
    await this.getSiteData()
  }

  // Components
  emitComponents() {
    this.tempDir.writeTemp('components/index.js', this.components.code)
  }

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
