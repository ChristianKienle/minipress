// @ts-check
const normalizeFile = require('./file')
const { stringify, createPageKey, relativePathToUrlPath } = require('@minipress/utils')
const fs = require('fs-extra')
const normalizeContentType = require('./content-type')

/**
 * @typedef {import('@minipress/types').File} File
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').ProcessablePage} ProcessablePage
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 * @typedef {import('./../../minipress')} Minipress
 */

/**
 * @param {'key' | 'path' | 'layout'} property
 * @param {ProcessablePage} page
 */
const enhanceWellKnownProperty = (property, page) => {
  const { frontmatter, attributes } = page
  if (page[property] != null) {
    return
  }
  const value = frontmatter[property] || attributes[property]
  if (value != null && typeof value === 'string') {
    page[property] = value
  }
}

/** @param {{ regularPath?: string; file: File }} options */
const normalizeRegularPath = ({ regularPath, file }) => {
  if (regularPath != null) {
    return regularPath
  }
  if (file.relative != null) {
    return relativePathToUrlPath(file.relative)
  }
}

/**
 * @param {File} file
 */
const getContent = file => {
  if (file.absolute != null) {
    return fs.readFileSync(file.absolute, 'utf-8')
  }
}

/**
 * @typedef {object} VirtualPage
 * @prop {string} key
 * @prop {string} content
 * @prop {string} contentType
 *
 * @param {Page} page
 * @returns {page is VirtualPage}
 */
const isVirtualPage = page => {
  const file = normalizeFile(page.file)
  return page.key != null && file.absolute == null && file.relative == null && page.content != null && page.contentType != null
}

/**
 * @typedef NormalizeOptions
 * @prop {import('@minipress/utils/src/temp-dir')} tempDir
 * @prop {import('./../../transformers')} transformers
 * @prop {import('./../../content-components')} contentComponents
 *
 * @param {Page} page
 * @param {NormalizeOptions} options
 * @returns {Promise<EmittablePage>}
 */
const normalizePage = async (page = {}, {
  transformers,
  tempDir,
  contentComponents
}) => {
  const file = normalizeFile(page.file)
  let key = page.key
  const regularPath = normalizeRegularPath({ regularPath: page.regularPath, file: file })
  const content = page.content || getContent(file) || ''
  const contentType = normalizeContentType({ ...page, file })
  const attributes = { ...(page.attributes || {}) }
  const headings = [ ...(page.headings || []) ]
  const frontmatter = { ...(page.frontmatter || {}) }
  const transformer = transformers.get(contentType)
  const layout = page.layout

  const ProcessablePage = {
    ...page,
    content,
    contentType,
    headings,
    regularPath,
    key,
    file,
    frontmatter,
    attributes,
    layout
  }
  if (transformer != null) {
    await transformer.parse(ProcessablePage)
    await transformer.transform(ProcessablePage)
  }

  // The following two function calls will try to read layout + key + path from
  // frontmatter + attributes if not already set on ProcessablePage and set it if
  // present in either one.
  enhanceWellKnownProperty('key', ProcessablePage)
  enhanceWellKnownProperty('path', ProcessablePage)
  enhanceWellKnownProperty('layout', ProcessablePage)

  if (ProcessablePage.key == null && file.absolute != null) {
    key = createPageKey(file.absolute)
    ProcessablePage.key = key
  }

  if (isVirtualPage(page)) {
    const absolutePath = tempDir.writeTemp(`virtual-pages/${ProcessablePage.key}.${ProcessablePage.contentType || 'md'}`, ProcessablePage.content)
    file.absolute = absolutePath
    contentComponents.register(page.key, { id: page.key, absolutePath })
  }

  let path = ProcessablePage.path
  if (path == null && ProcessablePage.file.relative != null) {
    path = relativePathToUrlPath(ProcessablePage.file.relative)
  }
  const _key = ProcessablePage.key
  if (_key == null) {
    throw Error(`Unable to further process page ${stringify(ProcessablePage)} because after doing everything we can it still has no key.`)
  }
  return {
    ...ProcessablePage,
    path,
    key: _key,
  }
}

/**
 * @param {Page[]} pages
 * @param {NormalizeOptions} options
 * @returns {Promise<ProcessablePage[]>}
 */
const normalizePages = async (pages, options) => Promise.all(pages.map(page => normalizePage(page, options)))

/**
 * This function prepares a page that is supposed to be made available on
 * the client/in the browser. Pages are exposed in site data and thus we have
 * to take care of a few things at this point:
 * - remove absolute path information
 * - remove the actual content
 * All of this has to be done on a deep copy of the page because we do not
 * want to mutate the original.
 * @param {EmittablePage} page
 */
const makePageAvailableToClient = page => {
  const { file = {} } = page
  const siteDataFile = { ...file }
  delete siteDataFile.absolute
  return {
    ...page,
    file: siteDataFile,
    content: ''
  }
}

module.exports = {
  normalizePage,
  normalizePages,
  makePageAvailableToClient
}