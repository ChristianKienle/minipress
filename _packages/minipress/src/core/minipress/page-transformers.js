// @ts-check
/**
 * @typedef {(page:any)=>Promise<void>} PageTransformer
 */

module.exports = class PageTransformers {
  constructor() {
    /** @type {PageTransformer[]} */
    this._all = []
  }

  /**
   * @param {PageTransformer} transformer
   */
  add(transformer) {
    this._all.push(transformer)
  }

  /**
   * @param {any} page
   */
  async transform(page) {
    for(const transformer of this._all) {
      await transformer(page)
    }
  }
}
