// @ts-check
const qs = require('querystring')
const { stringify } = require('@minipress/utils')

module.exports = class ContentComponent {
  /**
   * @typedef {object} Options
   * @prop {string} id
   * @prop {string} absolutePath
   */

  /**
   * @param {Options} options
   */
  constructor({ id, absolutePath }) {
    this.id = id
    this.absolutePath = absolutePath
  }

  get hasKnownContentType() {
    return /^(.*)(\.(md|vue))$/.exec(this.absolutePath) != null
  }

  /** @param {{contentOnly: boolean}} options */
  importPath({ contentOnly = false }) {
    const { hasKnownContentType, absolutePath, id } = this
    const params = {
      minipresspage: id,
      minipresscontentonly: String(contentOnly)
    }
    return `${absolutePath}${hasKnownContentType ? `?${qs.stringify(params)}` : ''}`
  }

  /** @param {{contentOnly: boolean}} options */
  importCode({ contentOnly = false }) {
    const importPath = this.importPath({ contentOnly })
    return `() => import(${stringify(importPath)})`
  }

  get code() {
    return `${stringify(`mp-content-${this.id}`)}: ${this.importCode({contentOnly: true})}`
  }
}
