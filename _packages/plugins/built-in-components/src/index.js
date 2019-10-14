// @ts-check
const { join } = require('path')
const PLUGIN = '@minipress/built-in-components'
/**
 * @type {import('@minipress/types').Plugin}
 */

module.exports = {
  name: PLUGIN,
  async apply(minipress) {
    minipress.hooks.registerAliases.tapPromise(PLUGIN, async () => {
      const p = require.resolve('vue-router-prefetch')
      minipress.aliases.register('vue-router-prefetch', p)
    })
    minipress.hooks.registerAppEnhancers.tapPromise(PLUGIN, async () => {
      const code = `

      import VueRoutePrefetch from 'vue-router-prefetch'

export default ({ Vue }) => {
  const internalPrefetchName = 'MiniLink'
  Vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

      `
      minipress.appEnhancers.add(code)
    })
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      const componentPath = name => join(__dirname, 'components', `${name}.vue`)
      minipress.components.register('MiniLayout', componentPath('layout'))
      minipress.components.register('MpOutboundLink', componentPath('outbound-link'))
      minipress.components.register('MiniContent', componentPath('content'))
    })

  }
}


// export default { install }
// import VueRoutePrefetch from 'vue-router-prefetch'
// // @ts-ignore
// import OutboundLink from './components/outbound-link.vue'
// // @ts-ignore
// import Layout from './components/layout.vue'
// // @ts-ignore
// import Content from './components/content.vue'

// const install = vue => {
//   vue.component('MpOutboundLink', OutboundLink)
//   vue.component('MiniLayout', Layout)
//   // vue.component('LayoutManager', LayoutManager)
//   vue.component('MiniContent', Content)
//   const internalPrefetchName = 'MiniLink'
//   vue.use(VueRoutePrefetch, {
//     componentName: internalPrefetchName,
//     // @ts-ignore
//     prefetch: process.minipress.mode === 'production'
//   })
// }

// export default { install }
