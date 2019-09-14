// @ts-check
const loaderUtils = require('loader-utils')
const Path = require('path')
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
  const layout = String(source).trim()
  // const page = options.minipress.pages.get(pageKey)
  // if (page == null) {
  //   throw Error(`page not found`)
  // }
  // if (module.hot) {
  //   var Vue = require('vue').default
  //   Component.options._Ctor = Vue.extend(Component)
  // }
  // Component.options.layout = ${c.stringify(layout)}
  const code = codeGen.js(c => `
    export default function(Component) {
      var layout = ${c.stringify(layout)}
      var beforeCreate = Component.options.beforeCreate || []
      Component.options.beforeCreate = [function() {
        this.$layout = layout
      }].concat(beforeCreate)

  }
  `)
  // const [options, error] = normalizeOptions(loaderUtils.getOptions(this))

  // if (error != null || options == null) {
  //   callback(error)
  //   return
  // }
  callback(/* error */ null, code, map)
  return
}
