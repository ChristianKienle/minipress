// @ts-check
const { resolve } = require('path')
const normalizeBuild = require('./build')
const { normalizePlugins } = require('./plugin')
const { getPkgJson } = require('@minipress/utils')

/**
 * @typedef {import('@minipress/types').Config} Config
 * @typedef {import('@minipress/types')._Config} _Config
 */

/**
 * @param {Config} config
 * @returns {_Config}
 */
const normalizeConfig = (config = {}) => {
  const cwd = config.cwd || process.cwd()
  const { value: pkg = {} } = getPkgJson(cwd)
  const minipressDir = resolve(cwd, '.minipress')
  const dest = config.dest || resolve(minipressDir, 'dist')
  const tempDir = config.tempDir || resolve(minipressDir, '.temp')
  const port = config.port || 4000
  const host = config.host || '0.0.0.0'
  const build = normalizeBuild({ minipressDir, build: config.build, pkg })
  const apply = config.apply || (async () => { })
  const plugins = normalizePlugins(config.plugins)
  const result = {
    tempDir,
    cwd,
    dest,
    port,
    host,
    build,
    apply,
    plugins
  }
  return result
}

module.exports = normalizeConfig

