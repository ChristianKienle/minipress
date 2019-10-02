// @ts-check
/**
 * @typedef {import('./types').SealedPlugin} Plugin
 */

const { normalizePlugin } = require('./normalize')
module.exports = class Plugins {
  constructor() {
    /** @type {Plugin[]} */
    this._all = []
  }

  /**
   * @param {string} id
   * @param {any=} options
   */
  use(id, options) {
    this._all.push(normalizePlugin([id, options]))
  }

  /** @param {import('./../minipress')} minipress */
  applyPlugins(minipress) {
    return Promise.all(this._all.map(plugin => plugin.apply(minipress)))
  }
}