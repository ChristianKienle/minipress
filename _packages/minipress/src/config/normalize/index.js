// @ts-check
const normalizeLayouts = require('./layouts')
const normalizeComponents = require('./components')
const normalizeConfigureSiteData = require('./site-data')
const normalizeBuild = require('./build')
const normalizeTheme = require('./theme')
const normalizePages = require('./pages')

module.exports = {
  normalizeLayouts,
  normalizeComponents,
  normalizeConfigureSiteData,
  normalizeBuild,
  normalizeTheme,
  normalizePages
}
