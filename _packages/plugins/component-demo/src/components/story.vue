<script>
// @ts-nocheck
export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    const componentName = `Story-${ctx.props.name}`
    return h(componentName)
  }
}
</script>