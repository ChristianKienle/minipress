/* eslint-disable no-underscore-dangle */
import { createApp } from './create-app'
const { app, router, store } = createApp()

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  app.$mount('#app')
})
