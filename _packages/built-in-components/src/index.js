// @ts-check

import VueRoutePrefetch from 'vue-router-prefetch'
// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import Layout from './components/layout.vue'
// @ts-ignore
import LayoutManager from './components/layout-manager.vue'
// @ts-ignore
import Content from './components/content.vue'

const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('MiniLayout', Layout)
  // vue.component('LayoutManager', LayoutManager)
  vue.component('MiniContent', Content)
  const internalPrefetchName = 'MiniLink'
  vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

export default { install }
