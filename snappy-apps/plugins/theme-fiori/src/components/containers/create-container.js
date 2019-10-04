export default (classPrefix, defaultTitle = '') => ({
  render(h) {
    const title = this.title || defaultTitle
    const hasTitle = title.length > 0
    const children = (() => {
      const result = []
      if(hasTitle) {
        const titleClass = `${classPrefix}__title`
        const renderedTitle = h('div', { class: titleClass }, title)
        result.push(renderedTitle)
      }
      result.push(...this.$slots.default)
      return result
    })()

    return h('div', { class: classPrefix }, children)
  },
  props: {
    title: {
      type: String,
      default: null
    }
  }
})
