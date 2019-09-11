// @ts-check
const pagesInDir = require('./helpers/get-pages-in-dir')
const componentsInDir = require('./helpers/components-in-dir')
const layoutsInDir = require('./helpers/layouts-in-dir')
const { resolve } = require('path')
const defaultTheme = require('@minpress/minpress-theme-default')

/**
 * @typedef {import('./types').Config} Config
 * @typedef {import('./types')._Config} _Config
 * @typedef {import('./types').BuildConfig} BuildConfig
 * @typedef {import('./types').Layouts} Layouts
 * @typedef {import('./types')._Layouts} _Layouts
 * @typedef {import('./types').Theme} Theme
 * @typedef {import('./types')._Theme} _Theme
 */

/**
 * @param {import('./types').SiteDataConfigurator=} configureSiteData
 * @returns {import('./types')._SiteDataConfigurator}
 */
const normalizeConfigureSiteData = configureSiteData => {
  if (configureSiteData == null) {
    return (site => Promise.resolve(site))
  }
  return async site => {
    const resultingSite = await configureSiteData(site)
    if(resultingSite == null) {
      return site
    }
    return resultingSite
  }
}

/**
 * @param {Layouts | undefined} layouts
 * @returns {_Layouts}
 */
const normalizeLayouts = layouts => {
  if (layouts == null) {
    return {}
  }
  if (typeof layouts === 'string') {
    return layoutsInDir(layouts)
  }
  return layouts
}

/**
 * @param {Theme} theme
 * @param {object} themeConfig
 * @return {_Theme}
 */
function normalizeTheme(theme, themeConfig) {
  return () => {
    const rawTheme = theme(themeConfig)
    return {
      dynamicModules() {
        return {}
      },
      components: normalizeComponents(process.cwd(), rawTheme.components),
      layouts: normalizeLayouts(rawTheme.layouts)
    }
  }
}

/**
 * @param {{
 *  build?: BuildConfig
 *  cwd: string
 * }} options */
const normalizeBuildConfig = ({ cwd, build = {} }) => {
  const {
    outDir = resolve(cwd, 'public'),
    base = '/'
  } = build
  return { outDir, base }
}

/**
 * @param {string} cwd
 * @param {string=} dir
 */
const normalizeComponents = (cwd, dir) => {
  const componentsDir = dir != null ? dir : resolve(cwd, 'components')
  return componentsInDir(componentsDir)
}

/**
 * @param {Config} config
 * @returns {_Config}
 */
const normalizeConfig = (config = {}) => {
  const cwd = config.cwd || process.cwd()
  const pagesDir = config.pages || cwd
  const pages = pagesInDir(pagesDir)
  const minpressDir = resolve(cwd, '.minpress')
  const dest = config.dest || resolve(minpressDir, 'dist')
  const tempDir = config.tempDir || resolve(minpressDir, '.temp')
  const navbar = config.navbar || { items: [] }
  const _layouts = config.layouts
  const layouts = normalizeLayouts(_layouts)
  const port = config.port || 4000
  const host = config.host || '0.0.0.0'
  const components = normalizeComponents(cwd, config.components)
  const build = normalizeBuildConfig({ cwd, build: config.build })
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

