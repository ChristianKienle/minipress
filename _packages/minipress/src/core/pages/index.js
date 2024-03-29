// @ts-check
const { normalizePage, makePageAvailableToClient } = require('./normalize')
const hash = require('hash-sum')

/**
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').ProcessablePage} ProcessablePage
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 */

// A new Pages Implementation:
// We no longer differentiate between "virtual pages" (pages that are created from a content-string)
// and "real" pages (*.md/*.vue-files). We simply get a page object, let all plugins/transformers
// and other entities operate on the page object and in the end we simply emit each page to a temp.
// directory. When that has happend a page either has some kind of "path" that we can use when we create
// the router or not. If a page does not have a path (and we cannot infer one) it will just not be part
// of any route. This is not an error but a very useful feature: Those pages could be included in other
// pages by using <Content pageKey="myPageKey" />.

/*
  New Flow:
  - plugins/others have to call minipress.createPage(…) initially
  - then plugins/others have to watch whatever they need to watch
  - when they detect a change they have to call minipress.createPage(…) again
  - minipress.createPage(…) does this:
    - it basically simply normalizes the given page
    - it then either creates or overwrite .temp/pages/$page.key.minipresspage
      with the hash of the page content.
  - our page loader is responsible to load everything that ends with *.md/*.vue.
  - each page processed by our loader has an artificial dependency to the *.minipresspage
  - this means that minipress has to ensure to only write a *.minipresspage once it has
    fully normalized it.

*/

// Normalizing a page means that we try our best to:
// - determine the content type
// - determine the key
// - permalink etc
// - use the best transformer in order to:
//     - parse the page: extract metadata
//     - transform the page: actually generate the HTML we need
/**
 * @typedef {object} Options
 * @prop {import('./../page-transformers')} pageTransformers
 * @prop {import('./../transformers')} transformers
 * @prop {import('@minipress/utils/src/temp-dir')} tempDir
 * @prop {import('../aliases')} aliases
 * @prop {import('../content-components')} contentComponents
 */
module.exports = class Pages {
  /**
  * @param {Options} options
  */
  constructor({
    aliases,
    contentComponents,
    pageTransformers,
    transformers,
    tempDir
  }) {
    this.aliases = aliases
    this.contentComponents = contentComponents
    this.pageTransformers = pageTransformers
    this.transformers = transformers
    this.tempDir = tempDir
    /** @type {Map<string, EmittablePage>} */
    this.pages = new Map()
  }

  createAlias() {
    const { tempDir, aliases } = this
    aliases.register('#minipress/pages', tempDir.resolveTemp('pages'))
    aliases.register('#minipress/virtual-pages', tempDir.resolveTemp('virtual-pages'))
  }

  /**
   * @param {Page} page
   * @return {Promise<EmittablePage>}
   */
  async createPage(page) {
    const ProcessablePage = await this.normalizePage(page)
    return this.set(ProcessablePage)
  }

  async emit() {
    this.values().forEach(page => this._emitPage(page))
  }

  /**
   * @param {EmittablePage} page
   */
  resolveInternalMinipressPagePath(page) {
    return this.tempDir.resolveTemp(`pages/${page.key}.minipresspage`)
  }
  /**
   * @param {EmittablePage} page
   */
  _emitPage(page) {
    const { tempDir } = this
    const pageHash = hash(page)
    const path = `pages/${page.key}.minipresspage`
    if(tempDir.existsSync(path)) {
      const existingHash = tempDir.readSync(path)
      if(pageHash === existingHash) {
        return
      }
    }
    tempDir.writeTemp(path, pageHash)
  }

  /** @param {Page} page */
  async normalizePage(page) {
    const { pageTransformers, transformers, contentComponents, tempDir } = this
    const ProcessablePage = await normalizePage(page, {
      transformers,
      contentComponents,
      tempDir
    })
    await pageTransformers.transform(ProcessablePage)
    return ProcessablePage
  }

  /** @param {EmittablePage} page */
  makePageAvailableToClient(page) {
    return makePageAvailableToClient(page)
  }

  [Symbol.iterator]() {
    return this.pages.entries()[Symbol.iterator]()
  }

  /** @returns {EmittablePage[]} */
  values() {
    return Array.from(this.pages.values())
  }

  /**
   * @template T
   * @param {function(EmittablePage): T } cb
   */
  map(cb) {
    return Array.from(this).map(([_, page]) => cb(page))
  }

  /**
   * @param {string} key
   * @returns {EmittablePage | undefined}
   */
  get(key) {
    return this.pages.get(key)
  }

  /**
   * @param {EmittablePage} page
   * @return {EmittablePage}
   */
  set(page) {
    return this._setPage(page.key, page)
  }

  /**
   * @param {string} key
   * @param {EmittablePage} page
   */
  _setPage(key, page) {
    this.pages.set(key, page)
    return page
  }

  /**
   * @param {string} key
   * @returns {EmittablePage | undefined}
   */
  removePage(key) {
    const page = this.get(key)
    if (this.pages.delete(key)) {
      return page
    }
  }

  /**
   * @param {(page: EmittablePage) => boolean} condition
   * @returns {EmittablePage | undefined}
   */
  removePageWhere(condition) {
    const page = this.values().find(condition)
    if(page == null) {
      return
    }
    this.removePage(page.key)
    return page
  }
}
