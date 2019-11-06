// @ts-check
module.exports = class AppEnhancer {
  /**
   * @typedef {object} CodeEnhancer
   * @prop {string} code
   *
   * @typedef {CodeEnhancer} Enhancer
   */

  /**
   *
   * @param {Enhancer} enhancer
   */
  constructor(enhancer) {
    this.enhancer = enhancer
  }
}