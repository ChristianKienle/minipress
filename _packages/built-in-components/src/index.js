// @ts-check

import VueRoutePrefetch from 'vue-router-prefetch'
// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import Layout from './components/layout.vue'
import LayoutManager from './components/layout-manager.vue'
// @ts-ignore
import Content from './components/content.vue'

const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('Layout', Layout)
  vue.component('LayoutManager', LayoutManager)
  vue.component('Content', Content)
  const internalPrefetchName = 'MpLink'
  vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

export default { install }
