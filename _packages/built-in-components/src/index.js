// @ts-check

import VueRoutePrefetch from 'vue-router-prefetch'
// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import LayoutManager from './components/layout-manager.vue'
// @ts-ignore
import Layout from './components/layout.vue'

const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('Layout', Layout)
  vue.component('MpLayoutManager', LayoutManager)
  const internalPrefetchName = 'MpLink'
  vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

export default { install }
