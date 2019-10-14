<script>
import site from '#minipress/site-data'
/**
 * @typedef {object} Options
 * @prop {import('vue-router/types/router').VueRouter} router
 * @prop {object} $site
 * @prop {any} Vue
 */
/**
 * @param {Options} options
*/
// Root *miniPress* instance.
export default {
  name: 'MinipressRoot',
  render(h) {
    const PageContentWrapper = h('div', {}, [h('RouterView')])
    return h('div', {}, [PageContentWrapper])
  },
  computed: {
    // @vuese
    // The page for the current route.
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
    // @vuese
    // The site data
    site() {
      return site
    }
  },
  methods: {
    /**
     * @param {string} to
     * @returns {string}
     */
    // @vuese
    // Finds a page with relativePath = to and returns it's path
    pageLink(to) {
      const _to = to.startsWith('/') ? to.substring(1) : to
      const page = (site.pages || []).find(({ file }) => file.relative === _to)
      if (page != null) {
        return page.path
      }
      return to
    },
    // @vuese
    // Finds a page for a given path
    pageForPath(_path) {
      const page = (site.pages || []).find(({ path }) => path === _path)
      if(page == null) {
        return
      }
      return page
    },
    // @vuese
    // Finds a page that has a given key
    pageForKey(_key) {
      // @ts-ignore
      return (site.pages || []).find(({ key }) => key === _key)
    }
  }
}
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
</script>
