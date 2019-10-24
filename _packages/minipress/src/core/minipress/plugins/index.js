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

  /** @param {import('@minipress/types').ConfigPlugin} plugin */
  use(plugin) {
    this._all.push(normalizePlugin(plugin))
  }

  /** @param {import('@minipress/types').MinipressI} minipress */
  applyPlugins(minipress) {
    return Promise.all(this._all.map(plugin => plugin.apply(minipress)))
  }
}
