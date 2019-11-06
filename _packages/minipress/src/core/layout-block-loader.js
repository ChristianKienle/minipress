// @ts-check
const loaderUtils = require('loader-utils')
const codeGen = require('@minipress/code-gen')
const normalizeOptions = require('./universal-page-loader/normalize-options')

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
  const layout = String(source).trim()
  const code = codeGen.js(c => `
    export default function(Component) {
      var layout = ${c.stringify(layout)}
      var beforeCreate = Component.options.beforeCreate || []
      Component.options.beforeCreate = [function() {
        this.$layout = layout
      }].concat(beforeCreate)
  }
  `)
  callback(/* error */ null, code, map)
  return
}
