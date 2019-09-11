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
    this.pages = config.pages
    this.cwd = config.cwd
    this.dest = config.dest
    this.tempDir = config.tempDir
    this.layouts = config.layouts
    this.navbar = config.navbar
    this.port = config.port
    this.host = config.host
    this.components = config.components
    this.build = config.build
    this.theme = config.theme
    this.themeConfig = config.themeConfig
    this.dynamicModules = config.dynamicModules
    this.configureSiteData = config.configureSiteData
  }
}
