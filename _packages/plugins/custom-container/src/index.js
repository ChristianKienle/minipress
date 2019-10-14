// @ts-check
const PLUGIN = "@minipress/custom-container"
const { join, parse } = require('path')
const CustomContainer = require('./custom-container')

const defaultRenderBefore = () => '<div>\n'
const defaultRenderAfter = () => '<div>\n'

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.configureMarkdownRenderer.tapPromise(PLUGIN, async renderer => {
      log.info(`Using custom container: ${JSON.stringify(options)}`)
      renderer.use(CustomContainer, options)
    })
  },

  optionsSchema({ joi }) {
    return joi.object({
      type: joi.string().required(),
      defaultTitle: joi.string().default(''),
      renderBefore: joi.func().optional(),
      renderAfter: joi.func().optional()
    })
  }
}
