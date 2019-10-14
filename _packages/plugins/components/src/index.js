// @ts-check
const normalize = require('./normalize')
const PLUGIN = '@minipress/plugin-components'

/**
 * @type {import('./../../plugin').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      const provider = await normalize(minipress.config.cwd, options)
      const components = await provider.resume()
      components.forEach(({ name, path }) => {
        log.info(`<${name}> registered`)
        minipress.components.register(name, path.absolute)
      })
      provider.close()
    })
  }
}
