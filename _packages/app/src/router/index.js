import Router from 'vue-router'
import _routes from '#minipress/routes'
import createScrollBehavior from './scroll-behavior'

// eslint-disable-next-line no-undef
const PUBLIC_URL = /** @type {string} */(__PUBLIC_URL__)
// eslint-disable-next-line no-undef
const MINIPRESS_TEMP_DIR = /** @type {string} */(__MINIPRESS_TEMP_DIR__)

export default (context, scollHub) => {
  const createRouter = routes => {
    const router = new Router({
      routes,
      base: PUBLIC_URL,
      mode: 'history',
      fallback: false,
      scrollBehavior: createScrollBehavior(scollHub)
    })
    return router
  }
  return createRouter(_routes)
}

if (module.hot) {
  const createTempPath = name => `./${MINIPRESS_TEMP_DIR}/${name}/index.js`
  // __MINIPRESS_TEMP_DIR__ is something like this: '.minipress/.temp'
  const paths = [
    createTempPath('site-data'),
    createTempPath('routes'),
  ]
  module.hot.accept(paths, () => { })
}
