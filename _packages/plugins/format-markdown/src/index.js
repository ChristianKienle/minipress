// @ts-check
const assert = require('assert')
// @ts-ignore
const ID = require('./../package.json').name
assert(ID)
const createTransformer = require('./transformer')

/**
 * @typedef {object} Options
 * @prop {string} test
*/

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  async apply(minipress) {
    const transformer = createTransformer()
    const renderer = transformer.renderer

    minipress.hooks.afterPlugins.tapPromise(ID, async () => {
      await minipress.hooks.configureMarkdownRenderer.promise(renderer)
    })

    minipress.hooks.registerTransformers.tapPromise(ID, async () => {
      minipress.transformers.set('md', transformer)
    })
  }
}
