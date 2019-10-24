// @ts-check
// A very thin wrapper around globby that returns objects instead of strings.

const globby = require('globby')
const Process = require('process')
const { join } = require('path')

/**
 * @typedef {object} Options
 * @prop {string} cwd
 */

/**
 * @param {string | string[]} globs
 * @param {Options} options
 */
module.exports = async (globs, options) => {
  const _options = options || {
    cwd: Process.cwd()
  }
  const { cwd } = _options
  const paths = await globby(globs, options)
  return paths.map(path => ({ relative: path, absolute: join(cwd, path) }))
}
