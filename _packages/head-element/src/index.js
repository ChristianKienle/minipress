// @ts-check
const codeGen = require('@minipress/code-gen')

/** @type {(title: string) => string}} */
const Title = title => `<title>${title}</title>`

/** @type {(name: string, content: string) => string}} */
const Meta = (name, content) => `<meta name="${name}" content="${content}">`

module.exports = class Head {
  constructor() {
    this._title = null
    /** @type {Map<string, string>} */
    this._meta = new Map() // maps name to content
  }

  /** @param {string} title */
  title(title) {
    this._title = title
    return this
  }

  /** @param {string} content */
  description(content) {
    return this.meta('Description', content)
  }

  /**
   * @param {string} name
   * @param {string} content
   */
  meta(name, content) {
    this._meta.set(name, content)
    return this
  }

  renderToString() {
    const metaTags = Array.from(this._meta.entries())
    const { _title } = this
    return codeGen.html(() => `${_title != null ? Title(_title) : ''}${metaTags.map(meta => Meta(...meta)).join('')}`).trim()
  }
}
