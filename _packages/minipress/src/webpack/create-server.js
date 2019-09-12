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
  config
    .entry('app')
    .clear()
    .add(entryPointPath)
    .end()

  config
    .target('node')
    .end()

  config
    .output
    .path(dest)
    .publicPath(minipressConfig.build.base)
    .filename('assets/js/[name].js')
    .libraryTarget('commonjs2')
    .end()

  config
    .externals(
      nodeExternals({
        whitelist: [/\.css$/, '@minipress/built-in-components']
      })
    ).end()

  config
    .plugin('vue-server')
    .use(VueSSRServerPlugin)
    .end()
  return config
}

module.exports = createServer
