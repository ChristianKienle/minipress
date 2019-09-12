import Vue from 'vue'
import createRouter from './router'
import createStore from './client/store'
import Layouts from '#minipress/layouts'
import $site from '#minipress/site-data'
import Components from '#minipress/components'
import createRootOptions from './root-options'
import MinipressComponents from '@minipress/built-in-components'
import Router from 'vue-router'

Vue.config.devtools = true;

// Expose $minipress everywhere
Vue.mixin({
  beforeCreate() {
    this.$minipress = this.$root
  }
})

Vue.use(Router)

export function createApp() {
  Vue.use(MinipressComponents)
  Vue.use(Components)
  Layouts(Vue)
  const router = createRouter()
  const store = createStore()
  const rootOptions = createRootOptions({ Vue, $site, router, store })
  const app = new Vue(rootOptions)
  return { app, router, store }
}
