// @ts-check
const { resolve } = require('path')
const { normalizeBuild } = require('./normalize')

/**
 * @typedef {import('./types').Config} Config
 * @typedef {import('./types')._Config} _Config
 */

/**
 * @param {Config} config
 * @returns {_Config}
 */
const normalizeConfig = (config = {}) => {
  const cwd = config.cwd || process.cwd()
  const minipressDir = resolve(cwd, '.minipress')
  const dest = config.dest || resolve(minipressDir, 'dist')
  const tempDir = config.tempDir || resolve(minipressDir, '.temp')
  const port = config.port || 4000
  const host = config.host || '0.0.0.0'
  const build = normalizeBuild({ cwd, build: config.build })
  const apply = config.apply || (async () => { })
  const result = {
    tempDir,
    cwd,
    dest,
    port,
    host,
    build,
    apply
  }
  return result
}

module.exports = normalizeConfig

