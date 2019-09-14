<script>
import ContentComponents from '#minipress/content-components'
export default {
  functional: true,
  name: "Content",
  render(h, context) {
    // return h('div')
    const pageKey = context.props.pageKey
    const contentKey = `mp-content-${pageKey}`
    const contentComponent = ContentComponents[contentKey]
    return h(contentComponent)
  },
  props: {
    pageKey: {
      type: String,
      required: true
    }
  }
};
</script>
