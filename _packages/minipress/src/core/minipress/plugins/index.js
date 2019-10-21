// @ts-check
const { normalizePlugin } = require('./../../../config/normalize/plugin')
/**
 * @typedef {import('@minipress/types').ConfigExecutablePlugin} ExecutablePlugin
 */
module.exports = class Plugins {
  constructor() {
    /** @type {ExecutablePlugin[]} */
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
