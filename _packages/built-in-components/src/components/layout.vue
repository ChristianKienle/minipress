<script>
export default {
  name: 'Layout',
  functional: true,
  props: {
    name: {
      type: String,
      default: null
    }
  },
  render(h, context) {
    const layoutName = context.props.name || context.parent.$minipress.page.layout || 'default'
    const componentName = `mp-layout-${layoutName}`
    const slots = context.slots()
    const defaultSlot = slots.default
    return  h(componentName, {}, defaultSlot)
  }
}
</script>
