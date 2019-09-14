// @ts-check
const MinipressWebpackConfig = require('./../webpack-config')
const enableMarkdownSupport = require('./../../markdown')
const TempDir = require('./../temp-dir')
const Pages = require('./../pages')
const Components = require('./../components')
const { prettifyJs } = require('./../../utils')
const MarkdownRenderer = require('./../../markdown/renderer')
const processLayouts = require('./process-layouts')

/**
 * @typedef {import('./../../config/types')._Page} _Page
 * @typedef {import('./../../config/types').Component} Component
 * @typedef {import('./../types').DynamicModuleFn} DynamicModuleFn
 * @typedef {import('./../page-route')} PageRoute
 *
 * @typedef {object} Options
 * @prop {import('./../../config/config')} config
 * @prop {import('@minipress/log').log} log
 */
class Minipress {
  /** @param {Options} options */
  constructor({ config, log }) {
    this.config = config
    this.webpack = new MinipressWebpackConfig({ config, log })
    this.log = log
    this.tempDir = new TempDir({ path: config.tempDir })
    /** @type {PageRoute[]} */ this.additionalRoutes = []
    this._initialized = false
    this.pages = new Pages()
    this.components = new Components()
    /** @type {Map<string, DynamicModuleFn>} */
    this.dynamicModules = new Map()
    this.markdownRenderer = new MarkdownRenderer()
    this.markdownRenderer.init({ cleanUrls: config.cleanUrls })
  }


  /** @param {string} name */
  /** @param {string} path */
  alias(name, path) {
    /** @param {import('webpack-chain')} config */
    const addAlias = config => {
      config.resolve.alias.set(name, path)
    }
    const { server, client } = this.webpack.asseertChains()
    addAlias(server)
    addAlias(client)
  }

  // Initializes the minipress instance.
  // This method must be called before calling any other method.
  // We don't call init(…) automatically in the ctor because we have to give
  // the whole system a chance to configure webpack and the minipress configuration.
  _init() {
    const { componentsWatcher, pagesWatcher } = this
    pagesWatcher.onAdded(page => this._pageAdded(page))
    pagesWatcher.onRemoved(page => this._pageRemoved(page))
    pagesWatcher.onChanged(page => this._pageChanged(page))

    componentsWatcher.onAdded(component => this._componentAdded(component))
    componentsWatcher.onRemoved(component => this._componentRemoved(component))
    componentsWatcher.onChanged(component => this._componentChanged(component))

    enableMarkdownSupport({ webpack: this.webpack, minipress: this })

    const aliases = ['config', 'pages', 'layouts', 'routes', 'components', 'site-data']
    aliases.forEach(alias => {
      const name = `#minipress/${alias}`
      const path = `${alias}/index.js`
      const initialContent = ''
      // writeTemp(…) returns the absolute path for the relative
      // path passed as the first argument.
      this.alias(name, this.tempDir.writeTemp(path, initialContent))
    })

    // Dynamic Modules
    Object.entries(this.config.dynamicModules({ context: this })).map(([name, code]) => {
      const moduleName = `#minipress/dynamic/${name}`
      this.alias(moduleName, this.tempDir.writeTemp(moduleName, code))
    })

    this._processLayouts()
  }

  async resumePages() {
    const allPages = await this.pagesWatcher.resume()
    await this._processPages(allPages)
  }

  /** @param {_Page[]} pages */
  async _processPages(pages) {
    await Promise.all(
      pages.map(page => this._processPage(page))
    )
  }

  /** @param {_Page} _page */
  async _processPage(_page) {
    const page = await this._pageAdded(_page)
    return page.process({ renderer: this.markdownRenderer })
  }

  /**
   * @typedef {object} RunOptions
   * @prop {boolean} watch
   */
  async run({ watch = true } = { }) {
    this.log.info(`Using publicUrl: ${this.config.build.base}`)
    if (this._initialized === false) {
      this._init()
      this._initialized = true
    }
    this.tempDir.writeTemp('config/index.js', this.config.code)
    await this.resumePages()
    const cleanUrls = this.config.cleanUrls
    await this.config.components.resume()
    this._processRoutes()
    this.processSiteData()

    if (watch === false) {
      this.pagesWatcher.close()
      this.config.components.close()
    }
  }

  _processLayouts() {
    processLayouts({ config: this.config, tempDir: this.tempDir })
  }

  async processSiteData() {
    const navbar = {
      items: this.config.navbar.items
    }
    const pages = this.pages.map(page => page.toJSON())
    const siteData = await this.config.configureSiteData({
      navbar,
      pages,
      themeConfig: this.config.themeConfig
    })
    const code = prettifyJs([
      `const siteData = ${JSON.stringify(siteData)};`,
      'export default siteData'
    ].join('\n'))

    this.tempDir.writeTemp('site-data/index.js', code)
  }

  // Routes
  /** @param {PageRoute} route */
  addRoute(route) {
    this.additionalRoutes.push(route)
  }

  _processRoutes() {
    const routes = this.routes()
    const routesCode = routes.map(route => route.code).join(',\n')
    const catchAllRouteCode = ',{ name: \'404\', path: \'*\', component: { render(h) { return h(\'h1\', {}, \'404\') } } }\n'
    const _code = routesCode + catchAllRouteCode
    const code = prettifyJs(`export default [${_code}];`)
    this.tempDir.writeTemp('routes/index.js', code)
  }

  routes() {
    return [...this.additionalRoutes, ...this.pageRoutes()]
  }

  // Components
  get componentsWatcher() {
    return this.config.components
  }

  processComponents() {
    this.tempDir.writeTemp('components/index.js', prettifyJs(this.components.code))
  }

  /** @param {Component} component */
  _componentAdded(component) {
    this.log.success(`<${component.name}> added`)
    this.components.set(component)
    this.processComponents()
  }

  /** @param {Component} component */
  _componentRemoved(component) {
    this.log.success(`<${component.name}> removed`)
    this.components.delete(component.name)
    this.processComponents()
  }

  /** @param {Component} component */
  _componentChanged(component) {
    this.log.success(`<${component.name}> changed`)
    this.components.set(component)
    this.processComponents()
  }

  // Pages
  get pagesWatcher() {
    return this.config.pages
  }

  pageRoutes() {
    return this.pages.map(page => page.route)
  }

  /** @param {_Page} _page */
  async _pageAdded(_page) {
    this.log.success(`${_page.regularPath} added`)
    const page = this.pages.set(_page.createKey(), _page)
    this._processRoutes()
    // await this.processSiteData()
    return page
  }

  /** @param {_Page} page */
  async _pageRemoved(page) {
    this.log.success(`${page.regularPath} removed`)
    this.pages.delete(page.createKey())
    this._processRoutes()
    await this.processSiteData()
  }

  /** @param {_Page} page */
  async _pageChanged(page) {
    this.log.success(`${page.regularPath} changed`)
    this._processRoutes()
    await this.processSiteData()
    this.pages.set(page.createKey(), page)
  }

  /** @param {string} key */
  /** @param {function(import('./../page')=): void} handler */
  withPage(key, handler) {
    const page = this.pages.get(key)
    handler(page)
    this.processSiteData()
  }
}

module.exports = Minipress
