// @ts-check
const normalizeConfig = require('./normalize-config')

/** @typedef {import('./types')._Config} __Config */
/** @typedef {import('./types').Config} _Config */

module.exports = class Config {
  /** @param {_Config} config */
  static fromUserProvidedConfig(config = {}) {
    return new Config(normalizeConfig(config))
  }

  /** @param {__Config} config */
  constructor(config) {
    this.cwd = config.cwd
    this.dest = config.dest
    this.tempDir = config.tempDir
    this.port = config.port
    this.host = config.host
    this.build = config.build
    this.apply = config.apply
  }

  get code() {
    // TODO
    return 'export default {}'
  }
}
