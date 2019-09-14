// @ts-check
const loaderUtils = require('loader-utils')
const codeGen = require('@minipress/code-gen')
const normalizeOptions = require('./../minipress/universal-page-loader/normalize-options')

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
  const pageKey = String(source).trim()
  const page = options.minipress.pages.get(pageKey)
  if (page == null) {
    throw Error('page not found')
  }

  const code = codeGen.js(c => `
  export default function(Component) {
    var beforeCreate = Component.options.beforeCreate || []
    Component.options.beforeCreate = [function() {
      var page = ${c.stringify(page)}
      this.$page = page
    }].concat(beforeCreate)
  }`)
  callback(/* error */ null, code, map)
  return
}
