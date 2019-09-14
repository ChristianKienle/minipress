// @ts-check
const assert = require('assert')
// @ts-ignore
const ID = require('./../package.json').name
assert(ID)
const Transformer = require('./transformer')

/**
 * @typedef {object} Options
 * @prop {string} test
*/

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  apply(minipress) {
    minipress.hooks.registerTransformers.tapPromise(ID, async () => {
      minipress.transformers.set('md', Transformer)
    })
  }
}
