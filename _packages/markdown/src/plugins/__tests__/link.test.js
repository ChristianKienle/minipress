// @ts-check
const createMd = require('./../../create-md')
const LinkPlugin = require('./../link')

describe('link plugin', () => {
  it('works', () => {
    const md = createMd().use(LinkPlugin, {})
    const page = {
      file: {
        relative: 'index.md'
      }
    }
    const env = {
      page
    }
    const expected = `<p><MiniLink :to="$minipress.pageLink('/index.md')">click</MiniLink></p>`
    expect(md.render('[click](./index.md)', env).trim()).toEqual(expected)
  })
})