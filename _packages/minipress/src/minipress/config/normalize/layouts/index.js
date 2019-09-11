// @ts-check
const { inDir: layoutsInDir } = require('./helpers')

/**
 * @typedef {import('./../../types').Layouts} Layouts
 * @typedef {import('./../../types')._Layouts} _Layouts
 */

/**
 * @param {Layouts=} layouts
 * @returns {_Layouts}
 */
module.exports = layouts => {
  if (layouts == null) {
    return {}
  }
  if (typeof layouts === 'string') {
    return layoutsInDir(layouts)
  }
  return layouts
}
