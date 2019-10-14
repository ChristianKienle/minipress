import Vue from 'vue'
import createRouter from './router'
import Layouts from '#minipress/layouts'
import AppEnhancers from '#minipress/app-enhancers'
import Components from '#minipress/components'
import rootOptions from './root-options.vue'
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
  Vue.use(Components)
  Vue.use(Layouts)
  const router = createRouter(context, scollHub)
  AppEnhancers({ Vue })

  const app = new Vue({ ...rootOptions, router })
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
