// @ts-check
const PLUGIN = "@minipress/custom-container"
const { join, parse } = require('path')
const CustomContainer = require('./custom-container')

const defaultRenderBefore = () => '<div>\n'
const defaultRenderAfter = () => '<div>\n'

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.chainMarkdown.tapPromise(PLUGIN, async chain => {
      log.info(`Using custom container: ${JSON.stringify(options)}`)
      const markdownPluginName = `${PLUGIN}--${options.type}`
      chain.plugin(markdownPluginName).use(CustomContainer, [options]).before('headings')
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
