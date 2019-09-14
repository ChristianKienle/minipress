// @ts-check
const loaderUtils = require('loader-utils')
const normalizeOptions = require('./normalize-options')
const codeGen = require('@minipress/code-gen')

/** @type {import("webpack").loader.Loader} */
module.exports = async function load(source, map) {
  const callback = this.async()
  if (callback == null) {
    throw Error('async() returned null which is not what was expected')
  }

  const [options, error] = normalizeOptions(loaderUtils.getOptions(this))

  if (error != null || options == null) {
    callback(error)
    return
  }

  const next = () => {
    callback(/* error */ null, source, map)
  }

  const { resourceQuery } = this

  if (resourceQuery == null || resourceQuery === '') {
    next()
    return
  }

  const { minipresspage: pageKey, minipresscontentonly: contentOnly } = loaderUtils.parseQuery(resourceQuery)

  // 'params' may contain anything and nothing. However we only care about
  // two special keys: minipresspage and minipresscontentonly
  // If minipresscontentonly is set then minipresspage must be set as well.
  // If minipresspage is set minipresscontentonly is optional.
  // 'minipresspage': The key of the page to load
  // 'minipresscontentonly': If present or 'true' then the page will be
  //                         loaded but not wrapped in a layout.

  if (pageKey == null || typeof pageKey !== 'string' || pageKey.length === 0) {
    next()
    return
  }

  console.log('ul', this.resourcePath)

  const { minipress } = options
  const page = minipress.pages.get(pageKey)
  if (page == null) {
    throw Error(`Unable to find page with key '${pageKey}'`)
  }

  const _contentOnly = contentOnly === 'true' || contentOnly === true

  const transformer = minipress.transformers.get(page.contentType)
  if (transformer == null) {
    throw Error('transformer cannot be null')
  }
  const internalPagePath = minipress.pages.resolveInternalMinipressPagePath(page)
  this.addDependency(internalPagePath)
  const component = await (_contentOnly ? transformer.getContentComponent(page) : transformer.getPageComponent(page))
  const componentWrappedWithLayout =
    codeGen.vue(() => `
      ${component}
      <page-prop>${page.key}</page-prop>
    `)
  callback(null, componentWrappedWithLayout, map)
  return // required by webpack
}
