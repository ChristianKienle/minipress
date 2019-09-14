<script>
/** @type {import('vue').FunctionalComponentOptions} */
const Layout = {
  name: 'LayoutManager',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default',
      /** @param {string=} value */
      validator(value) {
        return value != null && value.length > 0
      }
    },
  },
  render(h, { props, slots }) {
    const { name } = /** @type { {name: string} } */ (props)
    return  h(`mp-layout-${name}`, {}, slots().default)
  }
}
export default Layout
</script>
