// @ts-check
const assert = require('assert')
const ID = require('./../package.json').name
assert(ID)

/**
 * @typedef {object} Options
 * @prop {string} test
*/

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  // optionsSchema({joi}) {
  //   return
  // },
  apply(minipress, options = {}) {
  }
}
