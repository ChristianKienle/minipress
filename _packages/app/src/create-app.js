import Vue from 'vue'
import createRouter from './router'
import createStore from './client/store'
import CreateClientMixinPlugin from './minipress-plugin'
import Layouts from '#minipress/layouts'
import SiteData from '#minipress/site-data'
import Components from '#minipress/components'

import MinipressComponents from '@minipress/built-in-components'
Vue.config.devtools = true;

Vue.use(MinipressComponents)



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
