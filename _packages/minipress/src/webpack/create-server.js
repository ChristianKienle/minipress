// @ts-check
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const entryPointPath = require.resolve('@minipress/app/src/entry-server')

/**
 * @typedef {object} Options
 * @prop {string} dest
 * @prop {import('./../minipress/config/config')} minipressConfig
 */

/**
 * @param {import("webpack-chain")} config
 * @param {Options} options
 */
const createServer = (config, { dest, minipressConfig }) => {
  config.entry('app').clear()
    // .add(path.resolve(__dirname, '..', 'entry-server.js'))
    .add(entryPointPath)
    .end()
  config.target('node').end()
  config
    .output
    .path(dest)
    .publicPath(minipressConfig.build.base)
    .filename('assets/js/[name].js')
    .libraryTarget('commonjs2')
    .end()
  // config
  //   .output
  //   .path(options.dest)
  //   .libraryTarget('commonjs2')
  //   .end()
  config.externals(nodeExternals({
    whitelist: [/\.css$/, '@minipress/built-in-components']
  })).end()
  // config.stats('none').end()

  config.plugin('vue-server').use(VueSSRServerPlugin)
    .end()
  // config.module.rule('css').test(/\.css$/)
  //   .use('css-loader')
  //   .loader('css-loader')
  //   .options({
  //     modules: {
  //       localIdentName: '[local]_[hash:base64:8]'
  //     }
  //   })
  //   .end()
  return config
}

module.exports = createServer
