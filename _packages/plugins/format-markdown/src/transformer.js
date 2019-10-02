// @ts-check
const codeGen = require('@minipress/code-gen')
const Renderer = require('@minipress/markdown')

const renderer = new Renderer()
renderer.init()

/** @typedef {import('@minipress/types').Page} Page */

/** @type {import('@minipress/types').Transformer} */
const transformer = {
  async getContentComponent(page) {
    const result = codeGen.vue(() => `
    <template>
      <div class="minipress-content">${page.content}</div>
    </template>
    <script>
    export default {
      layout: 'default'
    }
    </script>
    `)
    return result
  },
  async transform(page) {
    const env = { page }
    const markup = renderer._render(page.content, env)
    page.content = markup
  },
  async parse(page) {
    const frontmatter = renderer.frontmatter(page.content)
    page.frontmatter = {
      ...page.frontmatter,
      ...frontmatter.attributes
    }
    page.content = frontmatter.markdownContent
  },
  async getPageComponent(page) {
    const result = codeGen.vue(() => `
    <template>
      <MiniLayout>
        <div>${page.content}</div>
      </MiniLayout>
    </template>
    <script>
    export default {
      layout: 'default'
    }
    </script>
    `)
    return result
  }
}

module.exports = transformer
