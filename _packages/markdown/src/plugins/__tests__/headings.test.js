// @ts-check
const createMd = require('./../../create-md')
const headingsPlugin = require('./../headings')

describe('headings plugin', () => {
  it('works', () => {
    const md = createMd().use(headingsPlugin)
    const page = { headings: [] }
    const env = {
      page
    }
    expect(md.render(`
# Title
Text

## Chapter 1
## Chapter 2
`, env)).toMatchSnapshot()
const { headings } = page
    expect(headings).toHaveLength(3)
    expect(headings[0]).toMatchObject({ text: 'Title', level: 1, slug: 'title'})
    expect(headings[1]).toMatchObject({ text: 'Chapter 1', level: 2, slug: 'chapter-1'})
    expect(headings[2]).toMatchObject({ text: 'Chapter 2', level: 2, slug: 'chapter-2'})
  })
})