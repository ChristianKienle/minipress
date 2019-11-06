// @ts-check
/**
 * @typedef {import('@minipress/types').Transformer} Transformer
 */
module.exports = class Transformers {
  constructor() {
    /** @type {Map<string, Transformer>} */
    this._byType = new Map()
  }

  get all() {
    return Array.from(this._byType)
  }

  /**
   * @param {string} contentType - usually file extension without the leading dot
   * @param {Transformer} transformer
   */
  set(contentType, transformer) {
    this._byType.set(contentType, transformer)
  }

  /**
   * @param {string} contentType - usually file extension without the leading dot
   */
  get(contentType) {
    return this._byType.get(contentType)
  }
}
