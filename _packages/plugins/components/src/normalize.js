// @ts-check
const { join } = require('path')
const componentsInDir = require('./components-in-dir')
const componentsInMapping = require('./components-in-mapping')
const nameForContext = require('./name-for-context')


/**
 * @typedef {import('./types').Components} Components
 * @typedef {import('./types').GetComponentName} GetComponentName
 * @typedef {import('@minipress/utils/watcher').WatcherI} WatcherI
 */

/** @type {GetComponentName} */
const defaultGetComponentName = context => {
  return nameForContext(context)
}

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
 * @typedef {object} Options
 * @prop {string} cwd
 * @prop {Components=} components
 * @prop {WatcherI=} watcher
 */
/**
 * @param {Options} options
 */
module.exports = options => {
  const { cwd, components } = options
  const components_ = _defaultComponents(cwd, components)
  if (typeof components_ === 'string') {
    return componentsInDir({ ...options, components: components_, getComponentName: defaultGetComponentName })
  }
  const mappingOrDir = components_.components || {}
  if(typeof mappingOrDir === 'object') {
    return componentsInMapping(mappingOrDir)
  }
  const dir = mappingOrDir
  const getName = components_.getComponentName || defaultGetComponentName

  return componentsInDir({ ...options, components: dir, getComponentName: getName })
}
