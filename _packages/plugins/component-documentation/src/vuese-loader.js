// @ts-check
const loaderUtils = require('loader-utils')
const { fromCode, renderer } = require('./api')
const { devalue } = require('@minipress/utils')
const MarkdownRenderer = require('@minipress/markdown')

const markdownRenderer = new MarkdownRenderer()

/** @type {import("webpack").loader.Loader} */
module.exports = async function load(source, map) {
  const _source = String(source)
  const callback = this.async()
  if (callback == null) {
    throw Error('async() returned null which is not what was expected')
  }

  const next = () => {
    callback(/* error */ null, source, map)
  }

  const { resourceQuery } = this

  if (resourceQuery == null || resourceQuery === '') {
    next()
    return
  }

  const { vueseapi } = loaderUtils.parseQuery(resourceQuery)

  if(vueseapi == null) {
    next()
    return
  }

  const parserResult = fromCode(_source)
  const md = renderer.Vuese(parserResult)
  const page = {}
  const { html } = markdownRenderer.render(md, { page })

  const code = `
  <template>
  <div>${html}</div>
  </template>
  <script>
  export default {}
  </script>
  `
  callback(/* error */ null, code, map)
  return
}
