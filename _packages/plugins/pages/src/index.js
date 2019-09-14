// @ts-check
const Path = require('path')
const getPagesInDir = require('./get-pages-in-dir')

const PLUGIN = '@minipress/plugin-pages'

const dirFromOptions = options => {
  if (options == null) { }
}
/**
* @type {import('./../../plugin').Plugin}
*/
module.exports = {
  async apply(minipress, options) {
    minipress.hooks.beforeRun.tapPromise(PLUGIN, async () => {
      const dir = (() => {
        const defaultDir = Path.join(minipress.config.cwd, 'pages')
        if (options == null) {
          return defaultDir
        }
        if (typeof options !== 'string') {
          minipress.log.error(`Invalid Options for Plugin pages: ${options} should be a string`)
          return defaultDir
        }
        return options
      })()
      const pages = getPagesInDir(dir)

      const initialPages = await pages.resume()
      await Promise.all(initialPages.map(page => minipress.addPage(page)))
      await minipress.hooks.emitPages.promise()
      await minipress.hooks.emitRoutes.promise()

      if (minipress.watch === false) {
        pages.close()
        return
      }

      pages.onAdded(async page => {
        await minipress.addPage(page)
        await minipress.hooks.emitPages.promise()
        await minipress.hooks.emitRoutes.promise()
      })

      pages.onChanged(async page => {
        await minipress.addPage(page)
        await minipress.hooks.emitPages.promise()
        await minipress.hooks.emitRoutes.promise()
      })
      pages.onRemoved(async page => {
        await minipress.hooks.emitPages.promise()
        await minipress.hooks.emitRoutes.promise()
      })
    })
  }
}
