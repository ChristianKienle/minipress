// @ts-check
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const entryPointPath = require.resolve('@minipress/app/src/entry-client')

/**
 * @typedef {object} Options
 * @prop {string} dest
 * @prop {import('./../config/config')} minipressConfig
 */

/**
 * @param {import("webpack-chain")} config
 * @param {Options} options
 */
const createClient = (config, { dest, minipressConfig }) => {
  config
    .entry('app')
    .clear()
    .add(entryPointPath)
    .end()

  config
    .plugin('vue-client')
    .use(VueSSRClientPlugin)
    .end()

  config
    .output
    .path(dest)
    .publicPath(minipressConfig.build.base)
    .filename('assets/js/[name].js')
    .end()

  return config
}

module.exports = createClient
