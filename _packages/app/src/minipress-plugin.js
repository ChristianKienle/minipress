// @ts-check
// @ts-ignore
import config from '#minipress/config'
export default $site => {
  console.log('config', config)
  return {
    /** @param {import('vue').VueConstructor} vue */
    install(vue) {
      vue.mixin({
        methods: {
          /**
           * Finds a page with relativePath = to and returns it's path
           * @param {string} to
           * @returns {string}
           */
          $minipressPageLink(to) {
            const _to = to.startsWith('/') ? to.substring(1) : to
            const pages = this.$site.pages
            const page = pages.find(page => page.relativePath === _to)
            if(page != null) {
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
          $headings() {
            // @ts-ignore
            return this.$page.headings
          },
          $frontmatter() {
            const page = this.$page
            // @ts-ignore
            return page == null ? {} : (page.frontmatter || {})
          },
          $pageMeta() {
            const { $_route = {}} = this
            // @ts-ignore
            const { meta = {} } = $_route
            return meta.$page || {}
          },
          $pageMetaKey() {
            // @ts-ignore
            return this.$pageMeta.key
          },
          $page() {
            // return this.$root.$options.$minipress.page
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
            return $site
          }
        }
      })
    }
  }
}
