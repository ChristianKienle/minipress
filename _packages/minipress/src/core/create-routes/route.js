// @ts-check
const codeGen = require('@minipress/code-gen')
const qs = require('querystring')

/** @typedef {import('./../types').PageMeta} PageMeta */

module.exports = class Route {
  /**
   * @typedef {object} Options
   * @prop {string} componentPath
   * @prop {string} path
   * @prop {PageMeta} meta
   */

  /** @param {Options} options  */
  constructor({ componentPath, path, meta }) {
    this.componentPath = componentPath
    this.path = path
    this.meta = meta
  }

  get pageKey() {
    return this.meta.$page.key
  }

  get hasKnownContentType() {
    return /^(.*)(\.(md|vue))$/.exec(this.componentPath) != null
  }

  /** @param {{contentOnly: boolean}} options */
  importPath({ contentOnly = false }) {
    const { hasKnownContentType, componentPath, pageKey } = this
    const params = {
      minipresspage: pageKey,
      minipresscontentonly: String(contentOnly)
    }
    return `${componentPath}${hasKnownContentType ? `?${qs.stringify(params)}` : ''}`
  }

  /** @param {{contentOnly: boolean}} options */
  importCode({ contentOnly = false }) {
    const importPath = this.importPath({ contentOnly })
    const chunkName = `page--${this.meta.$page.key}`
    const magicComment = `/* webpackChunkName: "${chunkName}" */`
    return codeGen.raw(c => `() => import(${magicComment} ${c.stringify(importPath)})`)
  }

  contentComponentCode() {
    return codeGen.raw(c => `
      ${c.stringify(`mp-content-${this.pageKey}`)}: ${this.importCode({contentOnly: true})}
    `)
  }

  /** @param {{contentOnly: boolean}} options */
  routeCode({ contentOnly = false } = { contentOnly: false }) {
    const { path, meta } = this
    return codeGen.raw(
      c => `{
        path: ${c.stringify(path)},
        component: ${this.importCode({ contentOnly })},
        meta: ${c.stringify(meta || {})}
      }`
    )
  }
}
