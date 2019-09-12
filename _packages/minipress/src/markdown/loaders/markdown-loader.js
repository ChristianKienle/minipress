// @ts-check
const qs = require('querystring')
const loaderUtils = require('loader-utils')

/**
 * @typedef {object} PreprocessResult
 * @prop {string} processedSource
 * @prop {object} frontmatter
 * @prop {string=} serializedVueMixin
 *
 * @typedef {(source: string) => PreprocessResult} Preprocessor
 * @typedef {(source: string) => string} MarkdownRenderer
 *
*/
/** @typedef {import('./../../core/minipress')} Minipress */

/** @type {import("webpack").loader.Loader} */
module.exports = function load(_source, map) {
  /**
   * @typedef {object} Options
   * @prop {Minipress} minipress
   */
  /** @type {Options} */
  const options = loaderUtils.getOptions(this)
  const source = String(_source)
  const pageKey = this.resourceQuery && qs.parse(this.resourceQuery.slice(1)).minipresspage
  const {
    minipress
  } = options
  const callback = this.callback
  const page = minipress.pages.get(pageKey)
  if (page == null) {
    throw Error(`Unable to find page with key '${pageKey}'`)
  }
  const { html, frontmatter } = minipress.markdownRenderer.render(source, { page })
  page.frontmatter = frontmatter
  const code = [
    '<template>',
    '  <MpLayoutManager>',
    `    <div class="page-content">${html}</div>`,
    '  </MpLayoutManager>',
    '</template>',
    '<script>',
    'export default {',
    '}',
    '</script>'
  ].join('\n')

  minipress.processSiteData()

  callback(null, code, map)
  return // required by webpack
}
