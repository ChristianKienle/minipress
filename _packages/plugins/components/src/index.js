// @ts-check
const normalize = require('./normalize')
const PLUGIN = '@minipress/plugin-components'
const { Watcher } = require('@minipress/utils')

/**
 * @type {import('./types').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      let watcher;
      const normalizeOptions = {
        components: options,
        cwd: minipress.config.cwd,
        watcher
      }
      const provider = await normalize(normalizeOptions)
      const components = await provider.getComponents()
      components.forEach(({ name, path }) => {
        log.info(`<${name}> registered`)
        minipress.components.register(name, path.absolute)
      })
      provider.close()
    })
  }
}
