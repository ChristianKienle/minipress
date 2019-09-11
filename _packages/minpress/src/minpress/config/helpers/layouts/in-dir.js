// @ts-check
const fromPaths = require('./from-paths')
const globby = require('globby')

/** @param {string} dir */
module.exports = dir => {
  const paths = globby.sync('*.vue', { absolute: true, cwd: dir })
  return fromPaths(paths)
}
