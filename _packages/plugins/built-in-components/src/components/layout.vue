<script>
// A component that renders a registered layout given it's name.
/** @type {import('vue').FunctionalComponentOptions} */
const Layout = {
  name: "MiniLayout",
  functional: true,
  props: {
    // The name of the layout you want to render
    name: {
      type: String,
      default: "default",
      /** @param {string=} value */
      validator(value) {
        return value != null && value.length > 0;
      }
    }
  },
  render(h, { parent, props, scopedSlots, slots }) {
    const { $page } = parent;
    const attrs = { props: { page: $page } };
    const { name } = /** @type { {name: string} } */ (props);
    const children = h("div", {}, [
      scopedSlots.default != null ? scopedSlots.default(attrs.props) : slots().default
    ]);
    const _props = {
      page: $page
    }
    return h(`mp-layout-${name}`, { ...attrs, props: _props }, [children]);
  }
}
export default Layout
</script>
