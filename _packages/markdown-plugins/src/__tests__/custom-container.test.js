// @ts-check
const Markdown = require('@minipress/markdown')
const CustomContaier = require('./../custom-container')
const FixHeadingsPlugin = require('./../fix-headings')

const TipContainer = {
  type: 'tip',
  defaultTitle: 'TIP',
  renderBefore: ({ title }) => `<Tip>${title}`,
  renderAfter: () => `</Tip>`
}

const CreateHeadingContainer = {
  type: 'heading',
  defaultTitle: '',
  renderBefore: () => ``,
  renderAfter: () => ``
}

describe('CustomContaier', () => {
  it('renders tip', () => {
    const md = new Markdown()
    md.use(CustomContaier, [TipContainer])
    const { html } = md.render('::: tip title\ntext\n:::', {})
    expect(html).toBe('<Tip>title<p>text</p>\n</Tip>')
  })

  // it('works in combination with the fix headings plugin', () => {
  //   const md = new Markdown()
  //   md.use(CustomContaier, [CreateHeadingContainer])
  //   md.use(FixHeadingsPlugin)
  //   const { html } = md.render('# title\n\n<!-- fix-headings-begin -->\n\n::: heading \n# hone\n:::\n\n<!-- fix-headings-end -->\n\n', {})
  //   expect(html).toBe('<Tip>title<p>text</p>\n</Tip>')

  // })
})
