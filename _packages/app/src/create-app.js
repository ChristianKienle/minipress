import Vue from 'vue'
import createRouter from './router'
import createStore from './client/store'
import CreateClientMixinPlugin from './minipress-plugin'
import Layouts from '#minpress/layouts'
import SiteData from '#minpress/site-data'
import Components from '#minpress/components'

import BuiltInMinpressComponents from '@minpress/built-in-components'
Vue.config.devtools = true;

Vue.use(BuiltInMinpressComponents)



const RootComponent = {
  render(h) {
    return h("div", {}, [h('RouterView')])
  }
}
Vue.use(CreateClientMixinPlugin(SiteData))
Vue.use(Components)
export function createApp() {
  Layouts(Vue)
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    // minipressOption: new Minipress(),
    router,
    store,
    render: h => h(RootComponent),
  })
  return { app, router, store }
}
