// @ts-check

import VueRoutePrefetch from 'vue-router-prefetch'
// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import LayoutManager from './components/layout-manager.vue'

const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('MpLayoutManager', LayoutManager)
  const internalPrefetchName = 'MpLink'
  vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

export default { install }
