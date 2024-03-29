// @ts-check
const PLUGIN = '@minipress/plugin-webpack-performance'
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

/** @type {import('./types').Plugin} */
module.exports = {
  name: PLUGIN,
  async apply(minipress, options) {
    minipress.hooks.getWebpackConfig.tapPromise(PLUGIN, async (config, type) => {
      if(options.enabled && type === 'server') {
        return smp.wrap(config)
      }
      return config
    })
  },
  optionsSchema({ joi }) {
    const defaultEnabled = process.env.NODE_ENV === 'development'
    return joi.object({
      enabled: joi.boolean().default(defaultEnabled)
    }).default({
      enabled: defaultEnabled
    })
  }
}
