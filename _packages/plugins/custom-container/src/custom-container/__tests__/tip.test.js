// @ts-check
const tip = require('./../tip')
const createMd = require('./../../../create-md')

describe('hi', () => {
  it('do', () => {
    const md = createMd()
    md.use(tip)
    const html = md.render('\n\n::: tip bla\ntest\n:::\n\n')
    expect(html).toMatchSnapshot()

  })
})
