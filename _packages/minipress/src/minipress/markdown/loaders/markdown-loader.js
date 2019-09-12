// @ts-check
const getFrontmatterFromSource = require('gray-matter')
const qs = require('querystring')
const loaderUtils = require('loader-utils')
const { prettifyJs } = require('./../../utils')

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
/** @type {Preprocessor} */
const defaultPreprocess = function (source) {
  const { data, content } = getFrontmatterFromSource(source)
  const processedSource = content
  return {
    frontmatter: data,
    processedSource,
    serializedVueMixin: '{}'
  }
}
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
  // const preprocessResult = defaultPreprocess(source)
  const page = minipress.pages.get(pageKey)
  if (page == null) {
    throw Error(`Unable to find page with key '${pageKey}'`)
  }
  // else {
  //   page.frontmatter = preprocessResult.frontmatter || {}
  // }
  const { html, frontmatter } = minipress.markdownRenderer.render(source, { page })
  page.frontmatter = frontmatter

  // const { html } = renderMarkdown({
  //   source: preprocessResult.processedSource,
  //   env: { page }
  // })
  const pageStringified = page != null ? page.stringified() : '{}'
  const code = [
    '<template>',
    '  <MpLayoutManager>',
    `    <div class="page-content">${html}</div>`,
    '  </MpLayoutManager>',
    '</template>',
    '<script>',
    'export default {',
    // 'beforeCreate() {',
    // `console.log("before create page", ${pageStringified})`,
    //   `this.$root.$options.minipressOption.page = ${pageStringified};`,
    // '}',
    '}',
    '</script>'
  ].join('\n')

  minipress.processSiteData()

  callback(null, code, map)
  return // requires per webpack docs
}
