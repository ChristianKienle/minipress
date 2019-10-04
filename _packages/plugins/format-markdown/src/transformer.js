// @ts-check
const codeGen = require('@minipress/code-gen')
const Renderer = require('@minipress/markdown')

/** @typedef {import('@minipress/types').Page} Page */

class Transformer {
  constructor() {
    this.renderer = new Renderer()
    this.renderer.init()
  }

  async getContentComponent(page) {
    const result = codeGen.vue(c => `
    <template>
      <div class="page-content">${page.content}</div>
    </template>
    <script>

    </script>
    `)
    return result
  }

  async transform(page) {
    const env = { page }
    const markup = this.renderer._render(page.content, env)
    page.content = markup
  }

  async parse(page) {
    const frontmatter = this.renderer.frontmatter(page.content)
    page.frontmatter = {
      ...page.frontmatter,
      ...frontmatter.attributes
    }
    if(frontmatter.attributes.key != null) {
      page.key = frontmatter.attributes.key
    }
    page.content = frontmatter.markdownContent
  }

  async getPageComponent(page) {
    const result = codeGen.vue(c => `
    <template>
      <MiniLayout name="${page.layout || 'default'}">
        <div>${page.content}</div>
      </MiniLayout>
    </template>
    `)
    return result
  }
}

module.exports = () => {
  /** @type {import('@minipress/types').Transformer} */
  return new Transformer()
}
