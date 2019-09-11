<script>
export default {
  name: 'MpLayoutManager',
  functional: true,
  render(h, context) {
    const layoutComponentName = context.parent.$layoutComponentName
    const slots = context.slots()
    const defaultSlot = slots.default
    const children = [h(layoutComponentName, {}, defaultSlot)]
    return  h('div', {}, children)
  }
}
</script>
