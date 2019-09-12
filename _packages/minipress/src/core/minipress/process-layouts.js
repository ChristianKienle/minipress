// @ts-check
const { prettifyJs } = require('./../../utils')

/**
 * @typedef {object} Options
 * @prop {import('./../../config/config')} config
 * @prop {import('./../temp-dir')} tempDir
 */
/**
 * @param {Options} options
 */
module.exports = ({ config, tempDir }) => {
  const configLayouts = config.layouts
  const themeLayouts = config.theme(config.themeConfig).layouts
  const layouts = Object.entries({
    ...configLayouts,
    ...themeLayouts
  })
  const layoutName = name => `mp-layout-${name}`
  const stringify = JSON.stringify
  const genImport = path => `() => import(${stringify(path)})`
  const code = prettifyJs([
    'export default vue => {',
    ...layouts.map(([name, path]) => `vue.component(${stringify(layoutName(name))}, ${genImport(path)})`),
    '}'
  ].join('\n'))
  tempDir.writeTemp('layouts/index.js', code)
}
