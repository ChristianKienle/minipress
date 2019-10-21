/* eslint-disable no-underscore-dangle */
/* global __MINIPRESS_TEMP_DIR__ */

import { createApp } from './create-app'
const { app, router } = createApp()

if (process.env.NODE_ENV === 'development') {
  require('./dev-client').createDevClient()
}

router.onReady(() => { app.$mount('#app') })

if (module.hot) {
  const createTempPath = name => `./${__MINIPRESS_TEMP_DIR__}/${name}/index.js`
  // __MINIPRESS_TEMP_DIR__ is something like this: '.minipress/.temp'
  const paths = [
    createTempPath('site-data'),
    createTempPath('routes'),
  ]
  module.hot.accept(paths, () => {})
}
