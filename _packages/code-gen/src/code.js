// @ts-check
const Context = require('./context')
const prettify = require('./prettify')
const { EOL } = require('os')

/**
 * @typedef {import('./types').Lang}  Lang
 */
module.exports = class Code {
  /**
   * @typedef {object} Options
   * @prop {Lang} [lang='js']
   */
  /**
   * @param {(context: Context) => (string[] | string | undefined)} generator
   * @param {Options} options
   */
  constructor(generator, { lang = 'js' } = {}) {
    this.lang = lang
    const context = new Context()
    const initialLines = generator(context) || []
    const _initialLines = Array.isArray(initialLines) ? initialLines : [initialLines]
    /** @type {string[]} */
    this.lines = []
    this.appendLines(...context.lines, ..._initialLines)
  }

  /**
   * @param {...string} lines
   */
  appendLines(...lines) {
    this.lines = this.lines.concat(lines)
    return this
  }
  /**
   * @typedef {object} GenOptions
   * @prop {boolean?} [prettify=true]
   */
  /**
   * @param {GenOptions} [options={prettify: true}]
   */
  gen(options = { prettify: true }) {
    const code = this.lines.join(EOL)
    return options.prettify ? prettify(code, this.lang) : code
  }
}