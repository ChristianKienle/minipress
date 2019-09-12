// @ts-check
const Page = require('./page')

/**
 * @typedef {import('./../config/types')._Page} _Page
 */

module.exports = class Pages {
  constructor() {
    /** @type {Map<string, Page>} */
    this.pages = new Map()
  }

  [Symbol.iterator]() {
    return this.pages.entries()[Symbol.iterator]()
  }

  /** @returns {Page[]} */
  values() {
    return Array.from(this.pages.values())
  }

  /**
   * @template T
   * @param {function(Page): T } cb */
  map(cb) {
    return Array.from(this).map(([_, page]) => cb(page))
  }

  /** @param {string} key */
  /** @returns {Page | undefined} */
  get(key) {
    return this.pages.get(key)
  }

  /**
   * @param {string} key
   * @param {Page | _Page} page
   * @return {Page}
   */
  set(key, page) {
    if (page instanceof Page) {
      this._setPage(key, page)
      return page
    }
    const _page = new Page({
      key: page.createKey(),
      ...page
    })
    this._setPage(key, _page)
    return _page
  }

  /** @param {string} key */
  /** @param {Page} page */
  _setPage(key, page) {
    this.pages.set(key, page)
  }

  /** @param {string} key */
  /** @returns {Page | undefined} */
  delete(key) {
    const page = this.get(key)
    this.pages.delete(key)
    return page
  }
}
