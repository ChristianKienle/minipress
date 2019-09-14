import Vue from 'vue'
import createRouter from './router'
import Layouts from '#minipress/layouts'
import Components from '#minipress/components'
import createRootOptions from './root-options'
import MinipressComponents from '@minipress/built-in-components'
import Router from 'vue-router'
// eslint-disable-next-line no-undef
const MINIPRESS_TEMP_DIR = /** @type {string} */(__MINIPRESS_TEMP_DIR__)

Vue.config.devtools = true

// Expose $minipress everywhere
Vue.mixin({
  beforeCreate() {
    this.$minipress = this.$root
  }
})


export function createApp(context) {
  const scollHub = new Vue()
  Vue.use(Router)
  Vue.use(MinipressComponents)
  Vue.use(Components)
  Vue.use(Layouts)
  const router = createRouter(context, scollHub)


  router.beforeEach(async (to, from, next) => {
    const components = router.getMatchedComponents(to) || []
    // for (const component of components) {
    //   if (typeof component === 'function') {
    //     const resolvedComponent = (await component()).default
    //     const asyncDataFn = resolvedComponent.asyncData
    //     if (asyncDataFn != null) {
    //       const asyncData = await asyncDataFn()
    //       if (context != null) {
    //         if (context.minipress != null) {
    //           context.minipress.asyncData = asyncData
    //           context.minipress.pageKey = to.meta.$page.key
    //           // await context.minipress.onAsyncData(asyncData, to.meta.$page.key)
    //         }
    //       }
    //     }
    //   }
    // }
    next()
  })
  const rootOptions = createRootOptions({ Vue, router })
  const app = new Vue(rootOptions)
  return { app, router }
}

if (module.hot) {
  const createTempPath = name => `./${MINIPRESS_TEMP_DIR}/${name}/index.js`
  // MINIPRESS_TEMP_DIR is something like this: '.minipress/.temp'
  const paths = [
    createTempPath('site-data'),
    createTempPath('routes')
  ]
  module.hot.accept(paths, () => { })
}
