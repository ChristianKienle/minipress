// @ts-check
const stringify = JSON.stringify
module.exports = class Context {
  constructor() {
    this.stringify = stringify
    /** @type {string[]} */
    this.lines = []
  }
  // get stringify() { return this._stringfiy }
  /**
   * @param {...string} lines
   */
  appendLines(...lines) {
    this.lines = this.lines.concat(lines)
    return this
  }
}