// @ts-check
export default $site => {
  console.log('$site', $site)
  return {
    /** @param {import('vue').VueConstructor} vue */
    install(vue) {
      vue.mixin({
        methods: {
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
            // return this.$root.$options.$minpress.page
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
