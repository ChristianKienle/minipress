// @ts-check
const Path = require('path')
const getPagesInDir = require('./get-pages-in-dir')
const { Watcher } = require('@minipress/utils')
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
      const watcher = Watcher.createFsWatcher({ dir, globs: ['**/*.vue', '**/*.md'] })
      const pages = getPagesInDir(dir, watcher)

      if (minipress.watch) {
        pages.onAdded(async page => {
          const _page = await minipress.addPage(page)
          await minipress.hooks.onCreatePage.promise(_page)
          await minipress.getSiteData()
          await minipress.hooks.emitPages.promise()
          await minipress.hooks.emitRoutes.promise()
        }).onChanged(async page => {
          const _page = await minipress.addPage(page)
          await minipress.hooks.onCreatePage.promise(_page)
          await minipress.getSiteData()
          await minipress.hooks.emitPages.promise()
          await minipress.hooks.emitRoutes.promise()
        }).onRemoved(async page => {
          const _page = await minipress.removePageWhere(({ key, file }) => {
            if(key === page.key) {
              return true
            }
            const { absolute, relative } = file || {}
            if(absolute === (page.file || {}).absolute) {
              return true
            }

            if(relative === (page.file || {}).relative) {
              return true
            }
            return false
          })
          if(_page != null) {
            await minipress.hooks.onRemovePage.promise(_page)
            await minipress.getSiteData()
            await minipress.hooks.emitPages.promise()
            await minipress.hooks.emitRoutes.promise()
          }
        })
      }

      const initialPages = await pages.getPages({ watch: minipress.watch })
      await Promise.all(initialPages.map(page => minipress.addPage(page)))

      await minipress.getSiteData()
      await minipress.hooks.emitPages.promise()
      await minipress.hooks.emitRoutes.promise()
    })
  }
}
