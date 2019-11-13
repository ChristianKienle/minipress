/** @typedef {import('markdown-it')} MarkdownIt */
/** @typedef {(md: MarkdownIt, ...args: any[]) => void} MarkdownItPlugin */

module.exports = class Plugin {
  /**
   * @param {import('./chain')} chain
   * @param {string} name
   */
  constructor(chain, name) {
    this.chain = chain
    this.name = name
    /** @type {MarkdownItPlugin=} */
    this._plugin = undefined
    /** @type {any[]} */
    this._args = []
  }

  /**
   * @param {MarkdownItPlugin} plugin
   * @param {any[]} args
   */
  use(plugin, args = []) {
    this._plugin = plugin
    this._args = args
    return this
  }

  /** @param {string} plugin */
  before(plugin) {
    this._before = plugin
    return this
  }

  end() {
    return this.chain
  }
}
