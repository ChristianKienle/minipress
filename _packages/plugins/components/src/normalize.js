// @ts-check
const { join } = require('path')
const componentsInDir = require('./components-in-dir')
const componentsInMapping = require('./components-in-mapping')

/**
 * @typedef {import('./types').Components} Components
 */

/**
* @param {string} cwd
* @param {Components=} components
* @returns {Components}
*/
const _defaultComponents = (cwd, components) => {
  if (components != null) {
    return components
  }
  if (components == null) {
    return join(cwd, 'components')
  }
  return components
}

/**
 * @param {string} cwd
 * @param {Components=} components
 */
module.exports = (cwd, components) => {
  const components_ = _defaultComponents(cwd, components)
  if (typeof components_ === 'string') {
    return componentsInDir(components_)
  }
  return componentsInMapping(components_)
}
