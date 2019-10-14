// @ts-check
const loaderUtils = require('loader-utils')
// const codeGen = require('@minipress/code-gen')
// const devalue = require('devalue')
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
  export default {
    // functional: true,
    // render(h, ctx) {
    //   const parserResult = ${parserResult}
    //   const props = {
    //     parserResult
    //   }
    //   return h('VueseComponentApi', { props })
    // }
  }
  </script>
  `
  callback(/* error */ null, code, map)
  return


  // // const [options, error] = normalizeOptions(loaderUtils.getOptions(this))
  // // if (error != null || options == null) {
  // //   callback(error)
  // //   return
  // // }
  // const pageKey = String(source).trim()
  // const page = options.minipress.pages.get(pageKey)
  // if (page == null) {
  //   throw Error('page not found')
  // }



  // // @ts-ignore
  // const serializedPage = devalue(options.minipress.pages.makePageAvailableToClient(page))

  // const code = codeGen.js(() => `
  // export default function(Component) {
  //   var beforeCreate = Component.options.beforeCreate || []
  //   Component.options.beforeCreate = [function() {
  //     var page = ${serializedPage}
  //     this.$page = page
  //   }].concat(beforeCreate)
  // }`)
  // callback(/* error */ null, code, map)
  // return
}
