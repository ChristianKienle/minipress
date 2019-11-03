// @ts-check
const Config = require('@minipress/config')

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
    this._all.push(Config.normalize.plugin.normalizePlugin(plugin))
  }

  /** @param {import('@minipress/types').MinipressI} minipress */
  applyPlugins(minipress) {
    return Promise.all(this._all.map(plugin => plugin.apply(minipress)))
  }
}
