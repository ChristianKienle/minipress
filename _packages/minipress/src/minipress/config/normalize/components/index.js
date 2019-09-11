// @ts-check
const { resolve } = require('path')
const componentsInDir = require('./components-in-dir')

/**
 * @param {string} cwd
 * @param {string=} dir
 */
module.exports = (cwd, dir) => {
  const componentsDir = dir == null ? resolve(cwd, 'components') : dir
  return componentsInDir(componentsDir)
}
