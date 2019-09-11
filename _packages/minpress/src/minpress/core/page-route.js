// @ts-check
const { stringify } = require('./../utils')
/** @typedef {import('./types').PageMeta} PageMeta */

module.exports = class PageRoute {
  /**
   * @typedef {object} Options
   * @prop {string} componentPath
   * @prop {string} path
   * @prop {PageMeta} meta
   */

  /** @param {Options} options  */
  constructor({componentPath, path, meta}) {
    this.componentPath = componentPath
    this.path = path
    this.meta = meta
  }

  get pageKey() {
    return this.meta.$page.key
  }

  get importComponentCode() {
    if (this.componentPath.endsWith('.md')) {
      const path = `${this.componentPath}?minpresspage=${this.pageKey}`
      return `() => import(${stringify(path)})`
    }
    return `() => import(${stringify(this.componentPath)})`
  }

  get code() {
    const { path, meta, importComponentCode } = this
    return `{ path: ${stringify(path)}, component: ${importComponentCode}, meta: ${stringify(meta || {})} }`
  }
}
