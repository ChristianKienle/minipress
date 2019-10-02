// @ts-check
const globby = require('globby')
const PLUGIN = "@minipress/plugin-layouts"
const { join, parse } = require('path')

/**
 * @type {import('./../../plugin').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.registerLayouts.tapPromise(PLUGIN, async () => {
      const layoutsDir = join(minipress.config.cwd, 'layouts')
      const layouts = await globby(['*.vue'], { absolute: true, cwd: layoutsDir })
      layouts.forEach(absolutePath => {
        const pathComponents = parse(absolutePath)
        log.info(`${pathComponents.name} registered (layout)`)
        minipress.layouts.register(pathComponents.name, absolutePath)
      })
    })
  },

  // If you don't want to validate your options
  // delete 'optionsSchema'.
  optionsSchema({ joi }) {
    return joi.any()
  }
}
