
{/* <template functional>
  <div :class="classPrefix">
    <div v-if="hasTitle" :class="titleClasses">
      {{ title }}
    </div>
    <slot />
  </div>
</template> */}
export default classPrefix => ({
  functional: true,
  render(h, { slots, props }) {
    const { title } = props
    const hasTitle = title.length > 0
    const children = (() => {
      const result = []
      if(hasTitle) {
        const titleClass = `${classPrefix}__title`
        const renderedTitle = h('div', { class: titleClass }, title)
        result.push(renderedTitle)
      }
      result.push(...slots().default)
      return result
    })()

    return h('div', { class: classPrefix }, children)
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  }
})

// <style scoped lang="stylus">
// @import '../styles/_config.stylus';
// @import '../styles/_container.stylus';

// .tip
//   make-container($base-color: #B2DBBF)
// </style>

