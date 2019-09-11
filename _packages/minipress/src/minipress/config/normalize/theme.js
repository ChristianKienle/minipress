// @ts-check
const normalizeComponents = require('./components')
const normalizeLayouts = require('./layouts')

/**
 * @typedef {import('./../types').Theme} Theme
 * @typedef {import('./../types')._Theme} _Theme
 */

/**
 * @param {Theme} theme
 * @param {object} themeConfig
 * @return {_Theme}
 */
module.exports = function normalizeTheme(theme, themeConfig) {
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
