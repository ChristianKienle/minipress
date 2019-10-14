<script>
import ContentComponents from '#minipress/content-components'

// `MiniContent` allows you to embed pages in other pages. You can use this for a lot of things. Here are a couple of use-cases to give you an idea:
// - **Don't repeat yourself:** Imagine you have some kind of warning message that you want to display on multiple pages. Instead of copy and pasting the warning message every time you need it you save it in a regular Markdown file and then embed it where you need it by using `MiniContent`.
// - **Use Markdown Features in `*.vue`-files:** It is not that easy to use Markdown features within `*.vue`-files. Imagine you want to create a page that needs to use certain Vue-features. Great. You create a page using the `vue`-file format. But now you can't use Markdown features like syntax highlighting, containers, etc. This is where `MiniContent` comes in. Simply store your Markdown content inside a `*.md`-file and embed it using `MiniContent`.
export default {
  functional: true,
  name: "MiniContent",
  render(h, context) {
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
