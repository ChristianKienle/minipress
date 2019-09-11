// @ts-check
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const entryPointPath = require.resolve('@minipress/app/src/entry-client')

/**
 * @typedef {object} Options
 * @prop {string} dest
 * @prop {import('./../minipress/config/config')} minipressConfig
 */

/**
 * @param {import("webpack-chain")} config
 * @param {Options} options
 */
const createClient = (config, { dest, minipressConfig }) => {
  const isProduction = process.env.NODE_ENV === 'production'
  config.entry('app').clear()
    // .add(path.resolve(__dirname, '..', 'entry-client.js'))
    .add(entryPointPath)
    .end()
  config.plugin('vue-client').use(VueSSRClientPlugin)
    .end()
  config
    .output
    .path(dest)
    .publicPath(minipressConfig.build.base)
    .filename('assets/js/[name].js')
  .end()

  if (isProduction === false) {
    // config
    //   .output
    //   .filename('[name].js')
    //   .path(options.dest)
    //   .publicPath(config)
    //   .end()
    config.devtool('source-map').end()
    // config.stats('none').end()
  } else {
    // config.plugin('css').use(CSSExtractPlugin)
    //   .tap(() => [{
    //     filename: '[name].[hash:8].css'
    //   }])
    //   .end()
  }
  return config
}

module.exports = createClient
