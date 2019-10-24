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
    const props = {
      pageKey: `StorySrc-${ctx.props.name}`
    }
    return h('MiniContent', { props })
  }
}
</script>