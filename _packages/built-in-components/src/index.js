// @ts-check

// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import LayoutManager from './components/layout-manager.vue'
import VueRoutePrefetch from 'vue-router-prefetch'

const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('MpLayoutManager', LayoutManager)
  vue.use(VueRoutePrefetch, {
    componentName: 'MpLink',
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
}

export default { install }
