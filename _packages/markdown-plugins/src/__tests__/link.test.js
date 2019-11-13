// @ts-check
const Markdown = require('@minipress/markdown')
const LinkPlugin = require('./../link')

describe('link plugin', () => {
  it('works', () => {
    const md = new Markdown().use(LinkPlugin, [{}])
    const page = {
      file: {
        relative: 'index.md'
      }
    }
    const env = {
      page
    }
    const expected = `<p><MiniLink :to="$minipress.pageLink('/index.md')">click</MiniLink></p>`
    expect(md.render('[click](./index.md)', env).html.trim()).toEqual(expected)
  })
})