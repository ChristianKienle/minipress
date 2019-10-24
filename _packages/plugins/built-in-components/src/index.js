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
      minipress.aliases.register('vue-router-prefetch', require.resolve('vue-router-prefetch'))
    })
    minipress.hooks.registerAppEnhancers.tapPromise(PLUGIN, async () => {
      // The following enhancer installs vue-router-prefetch and enables prefetching
      // when running in production mode. vue-router-prefetch patches router-link so
      // that we don't have to do anything for router-link.
      // MiniLink is using router-link for additional 'magic'
      const code = `
import VueRoutePrefetch from 'vue-router-prefetch'
export default ({ Vue }) => {
  Vue.use(VueRoutePrefetch, {
    prefetch: process.minipress.mode === 'production'
  })
}
`
      minipress.appEnhancers.add(code)
    })
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      const componentPath = name => join(__dirname, 'components', `${name}.vue`)
      /**
       * @param {string} name
       * @param {string} filename
       */
      const register = (name, filename) => {
        minipress.components.register(name, componentPath(filename))
      }
      register('MiniLayout', 'layout')
      register('MpOutboundLink', 'outbound-link')
      register('MiniContent', 'content')
      register('MiniLink', 'link')
    })

  }
}
