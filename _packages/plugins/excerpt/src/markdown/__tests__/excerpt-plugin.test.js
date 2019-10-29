// @ts-check
const excerptPlugin = require('./../excerpt-plugin')
const MarkdownRenderer = require('@minipress/markdown')

describe('excerpt-plugin', () => {
  it('works', () => {
    const renderer = new MarkdownRenderer()
    renderer.use(excerptPlugin)
    renderer.init()
    const page = {
      file: {
        relative: 'posts/1.md'
      }
    }
    const env = {
      page
    }
    const { html, frontmatter } = renderer.render('first paragraph\n\n<!-- more -->\n\nsecond paragraph', env)
    const { excerpt } = page
    expect(excerpt).toBeDefined()
    expect(excerpt.trim()).toEqual('<p>first paragraph</p>')
  })
})
