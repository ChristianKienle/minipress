// @ts-check
// This file contains the options for our $root Vue component.
/**
 * @typedef {object} Options
 * @prop {import('vue-router/types/router').VueRouter} router
 * @prop {import('vuex').Store} store
 * @prop {object} $site
 * @prop {any} Vue
 */
/**
 * @param {Options} options
 * @returns {import('vue').ComputedOptions}
*/
export default ({ Vue, router, store, $site: _site }) => {
  return {
    // @ts-ignore
    router,
    store,
    render(h) {
      return h('div', {}, [h('RouterView')])
    },
    methods: {
      /**
       * Finds a page with relativePath = to and returns it's path
       * @param {string} to
       * @returns {string}
       */
      pageLink(to) {
        const _to = to.startsWith('/') ? to.substring(1) : to
        const pages = this.$site.pages
        const page = pages.find(page => page.relativePath === _to)
        if (page != null) {
          return page.path
        }
        return to
      },
      $pageForKey(key) {
        // @ts-ignore
        const pages = this.$site.pages || []
        return pages.find(page => page.key === key)
      }
    },
    computed: {
      themeConfig() {
        // @ts-ignore
        return this.$site.themeConfig
      },
      headings() {
        // @ts-ignore
        return this.$page.headings
      },
      $frontmatter() {
        const page = this.$page
        // @ts-ignore
        return page == null ? {} : (page.frontmatter || {})
      },
      $pageMeta() {
        const { $_route = {} } = this
        // @ts-ignore
        const { meta = {} } = $_route
        return meta.$page || {}
      },
      $pageMetaKey() {
        // @ts-ignore
        return this.$pageMeta.key
      },
      $page() {
        // @ts-ignore
        return this.$pageForKey(this.$pageMetaKey)
      },
      $layoutName() {
        const page = this.$page
        // @ts-ignore
        return page == null ? "default" : page.layout
      },
      $layoutComponentName() {
        return `mp-layout-${this.$layoutName}`
      },
      $_route() {
        return this.$route
      },
      $site() {
        return _site
      }
    }
  }
}
