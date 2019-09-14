import site from '#minipress/site-data'
// This file contains the options for our $root Vue component.
/**
 * @typedef {object} Options
 * @prop {import('vue-router/types/router').VueRouter} router
 * @prop {object} $site
 * @prop {any} Vue
 */
/**
 * @param {Options} options
*/
export default ({ router }) => ({
  // @ts-ignore
  router,
  render(h) {
    const RouterView = h('RouterView')
    const PageContentWrapper = h('div', { class: 'page-content' }, [RouterView])
    return h('div', {}, [PageContentWrapper])
  },
  computed: {
    page() {
      const { $route } = this
      if ($route == null) {
        return
      }
      const { meta = {} } = $route
      const { $page = {} } = meta
      const pageKey = $page.key
      return (site.pages || []).find(({ key }) => key === pageKey)
    },
    site() {
      return site
    },
    themeConfig() {
      return site.themeConfig
    },
  },
  methods: {
    /**
     * Finds a page with relativePath = to and returns it's path
     * @param {string} to
     * @returns {string}
     */
    pageLink(to) {
      const _to = to.startsWith('/') ? to.substring(1) : to
      const page = (site.pages || []).find(({ file }) => file.relative === _to)
      if (page != null) {
        return page.path
      }
      return to
    },
    pageForPath(_path) {
      const page = (site.pages || []).find(({ path }) => path === _path)
      if(page == null) {
        return
      }
      return page
    },
    pageForKey(_key) {
      // @ts-ignore
      return (site.pages || []).find(({ key }) => key === _key)
    }
  }
})

if (module.hot) {
  // eslint-disable-next-line no-undef
  const MINIPRESS_TEMP_DIR = /** @type {string} */(__MINIPRESS_TEMP_DIR__)
  const createTempPath = name => `./${MINIPRESS_TEMP_DIR}/${name}/index.js`
  // MINIPRESS_TEMP_DIR is something like this: '.minipress/.temp'
  const paths = [
    createTempPath('site-data'),
    createTempPath('routes')
  ]
  module.hot.accept(paths, () => { })
}
