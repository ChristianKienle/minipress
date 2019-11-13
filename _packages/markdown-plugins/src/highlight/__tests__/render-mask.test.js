// @ts-check
const render = require('./../render-mask')

describe('highlight markdown plugin – render mask', () => {
  it('works', () => {
    const result = render({
      highlightLines: [1,2,3],
      escapedContent:
`export default {
 hello: 'world'
}`})
    expect(result).toMatchSnapshot()
  })
})
