<script>
/** @type {import('vue').FunctionalComponentOptions} */
const Layout = {
  name: "MiniLayout",
  functional: true,
  props: {
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
    return h(`mp-layout-${name}`, {...attrs}, [children]);
  }
};
export default Layout;
</script>
