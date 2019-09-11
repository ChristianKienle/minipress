// @ts-check
const { resolve } = require('path')
const defaultTheme = require('@minipress/minipress-theme-default')
const {
  normalizeLayouts,
  normalizeComponents,
  normalizeConfigureSiteData,
  normalizeBuild,
  normalizeTheme,
  normalizePages
} = require('./normalize')

/**
 * @typedef {import('./types').Config} Config
 * @typedef {import('./types')._Config} _Config
 */

/**
 * @param {Config} config
 * @returns {_Config}
 */
const normalizeConfig = (config = {}) => {
  const cwd = config.cwd || process.cwd()
  const pages = normalizePages({ cwd, pages: config.pages })
  const minipressDir = resolve(cwd, '.minipress')
  const dest = config.dest || resolve(minipressDir, 'dist')
  const tempDir = config.tempDir || resolve(minipressDir, '.temp')
  const navbar = config.navbar || { items: [] }
  const layouts = normalizeLayouts(config.layouts)
  const port = config.port || 4000
  const host = config.host || '0.0.0.0'
  const components = normalizeComponents(cwd, config.components)
  const build = normalizeBuild({ cwd, build: config.build })
  const themeConfig = config.themeConfig || {}
  const dynamicModules = config.dynamicModules || (() => ({}))
  const configureSiteData = normalizeConfigureSiteData(config.configureSiteData)
  const result = {
    tempDir,
    cwd,
    pages,
    dest,
    navbar,
    layouts,
    port,
    host,
    components,
    build,
    themeConfig,
    theme: normalizeTheme(config.theme || defaultTheme, themeConfig),
    dynamicModules,
    configureSiteData
  }
  return result
}

module.exports = normalizeConfig

