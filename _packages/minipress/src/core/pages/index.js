// @ts-check
const { normalizePage } = require('./normalize')
const hash = require('hash-sum')

/**
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').ProcessablePage} ProcessablePage
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 * @typedef {import('./../minipress')} Minipress
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

module.exports = class Pages {
  /**
  * @param {Minipress} minipress
  */
  constructor(minipress) {
    this.minipress = minipress
    /** @type {Map<string, EmittablePage>} */
    this.pages = new Map()
  }

  createAlias() {
    const { minipress } = this
    const { tempDir } = minipress
    this.minipress.aliases.register('#minipress/pages', tempDir.resolveTemp('pages'))
    this.minipress.aliases.register('#minipress/virtual-pages', tempDir.resolveTemp('virtual-pages'))
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
    return this.minipress.tempDir.resolveTemp(`pages/${page.key}.minipresspage`)
  }
  /**
   * @param {EmittablePage} page
   */
  _emitPage(page) {
    const { minipress } = this
    const { tempDir } = minipress
    // const pageHash = `export default '${hash(page)}'`
    const pageHash = hash(page)
    const path = `pages/${page.key}.minipresspage`
    if(tempDir.existsSync(path)) {
      const existingHash = tempDir.readSync(path)
      // const existingHash = `export default '${tempDir.readSync(path)}`
      if(pageHash === existingHash) {
        return
      }
    }
    tempDir.writeTemp(path, pageHash)
  }

  /** @param {Page} page */
  async normalizePage(page) {
    const ProcessablePage = await normalizePage(page, {
      minipress: this.minipress,
      transformers: this.minipress.transformers
    })
    await this.minipress.pageTransformers.transform(ProcessablePage)
    return ProcessablePage
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
  delete(key) {
    const page = this.get(key)
    if (this.pages.delete(key)) {
      return page
    }
  }
}
