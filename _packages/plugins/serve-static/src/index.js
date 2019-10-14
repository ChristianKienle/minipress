// @ts-check
const PLUGIN = '@minipress/plugin-serve-static'
const serveStatic = require('serve-static')
const { join } = require('path')
const { removeTrailingSlash } = require('@minipress/utils')
const fs = require('fs-extra')

module.exports = {
  async apply(minipress, options) {
    minipress.hooks.configureRequestServer.tapPromise(PLUGIN, async server => {
      const staticBase = removeTrailingSlash(options.as)
      server.use(staticBase, serveStatic(options.dir))
    })

    minipress.hooks.afterGenerate.tapPromise(PLUGIN, async () => {
      fs.copySync(options.dir, minipress.config.build.outDir)
    })
  },
  optionsSchema({ config, joi }) {
    const as = config.build.base
    const dir = join(config.cwd, 'public')
    return joi.object({
      as: joi.string().default(as),
      dir: joi.string().default(dir)
    }).default({ as, dir })
  },
}
