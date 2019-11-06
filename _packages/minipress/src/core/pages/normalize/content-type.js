// @ts-check
const Path = require('path')

/**
 * @typedef {import('@minipress/types').File} File
 * @typedef {import('@minipress/types')._File} _File
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').ProcessablePage} ProcessablePage
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 * @typedef {import('./../../minipress')} Minipress
 */

/**
 * @param {string=} path
 */
const inferContentTypeFromPath = path => {
  if (path == null) {
    return
  }
  const extension = Path.extname(path)
  if (extension.length === 0) {
    return
  }
  return extension.slice(1)
}

/**
* @param {File} file
* @param {{defaultContentType: string}} [options = { defaultContentType: 'default' }]
*/
const inferContentTypeFromFile = (
  { relative, absolute },
  { defaultContentType } = { defaultContentType: 'default' }
) => inferContentTypeFromPath(relative) || inferContentTypeFromPath(absolute) || defaultContentType

/**
 * @typedef {object} Options
 * @prop {File} file
 * @prop {string=} contentType
 */

/**
 * @param {Options} options
 */

module.exports = ({ contentType, file }) => contentType || inferContentTypeFromFile(file)
