// @ts-check
const codeGen = require('@minipress/code-gen')

/** @type {import('@minipress/types').Transformer} */
const transformer = {
  async getContentComponent(page) {
    const result = codeGen.vue(c => `
    <script>
    import PageComponent from ${c.stringify(page.file.absolute)}
    export default {
      render(h, context) {
        const scopedSlots = {
          default(props) {
            return h(PageComponent, { props })
          }
        }
        return h('div', {
          class: 'minipress-content',
        },
        [h(PageComponent, { props })])
      }
    }
    </script>
    `)
    return result
  },
  async parse(page) {
  },
  async transform(page) {
  },
  async getPageComponent(page) {
    return codeGen.vue(c => `
    <script>
    import PageComponent from ${c.stringify(page.file.absolute)}
    export default {
      render(h, context) {
        const scopedSlots = {
          default(props) {
            return h(PageComponent, { props })
          }
        }
        return h('Layout', { props: { name: PageComponent.layout || 'default' }, scopedSlots })
      }
    }
    </script>
    `)
  }
}

module.exports = transformer
