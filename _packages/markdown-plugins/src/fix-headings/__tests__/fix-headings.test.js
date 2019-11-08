// @ts-check
const FixHeadingsPlugin = require('./../')
const HeadingsPlugin = require('./../../headings')
const Markdown = require('@minipress/markdown')

describe('Fix Headings Plugin', () => {
  describe('in combination with the headings plugin', () => {
    it('works', () => {
      const md =
        new Markdown()
        .use(FixHeadingsPlugin)
        .use(HeadingsPlugin)
      const page = { headings: [] }
      const env = {
        page
      }
      expect(md.render(`
# Title

## Chapter 1

<!-- fix-headings-begin -->

# Partial 1

<!-- fix-headings-end -->

## Chapter 2
<!-- fix-headings-begin -->

# Partial 2

<!-- fix-headings-end -->

`, env).html).toMatchSnapshot()

      const { headings } = page
      expect(headings).toHaveLength(5)
      expect(headings[0]).toMatchObject({ text: 'Title', level: 1, slug: 'title' })
      expect(headings[1]).toMatchObject({ text: 'Chapter 1', level: 2, slug: 'chapter-1' })
      expect(headings[2]).toMatchObject({ text: 'Partial 1', level: 3, slug: 'partial-1' })
      expect(headings[3]).toMatchObject({ text: 'Chapter 2', level: 2, slug: 'chapter-2' })
      expect(headings[4]).toMatchObject({ text: 'Partial 2', level: 3, slug: 'partial-2' })
    })
  })

  it('works alone', () => {
    const md = new Markdown()
    md.use(FixHeadingsPlugin)
    const markup = md.render('# hello\n\n<!-- fix-headings-begin -->\n# world\n<!-- fix-headings-end -->\n', { page: {} }).html
    expect(markup).toEqual('<h1>hello</h1>\n<h2>world</h2>\n')
  })
})
