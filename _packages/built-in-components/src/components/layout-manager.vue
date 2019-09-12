<script>
import Layout from './layout.vue'
export default {
  name: 'MpLayoutManager',
  functional: true,
  render(h, context) {
    const slots = context.slots()
    const defaultSlot = slots.default
    return h(Layout, {}, defaultSlot)
  }
}
</script>
