// @ts-check

// @ts-ignore
import OutboundLink from './components/outbound-link.vue'
// @ts-ignore
import LayoutManager from './components/layout-manager.vue'
import VueRoutePrefetch from 'vue-router-prefetch'
const install = vue => {
  vue.component('MpOutboundLink', OutboundLink)
  vue.component('MpLayoutManager', LayoutManager)
  const internalPrefetchName = 'MpLink'
  vue.use(VueRoutePrefetch, {
    componentName: internalPrefetchName,
    // @ts-ignore
    prefetch: process.minipress.mode === 'production'
  })
  // const MpInternalPrefetchLink = vue.component(internalPrefetchName)
  // if (MpInternalPrefetchLink == null) {
  //   throw Error(`Serious internal error: component ${internalPrefetchName} not found.`)
  // }
  // vue.component('MpLink', vue.extend())
}

export default { install }
