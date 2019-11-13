// @ts-check
const createMd = require('./../create-md')

describe('md', () => {
  it('works', () => {
    const md = createMd()
    const markup = md.render('# hello <MyBadge />')
    expect(markup).toMatchSnapshot()
  })

  it('works2', () => {
    const md = createMd()
    const text = '# title\n\ntest `cool` test <MyButton /> bla\n\n'
    const markup = md.render(text)
    expect(markup).toMatchSnapshot()
  })
})