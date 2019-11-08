// @ts-check
const normalize = require('./../normalize-options')

describe('highlight markdown plugin – normalize options', () => {
  it('works for {}', () => {
    expect(normalize({})).toMatchObject({
      highlightLines: [],
      lineNumbers: false
    })
  })

  it("works for highlightLines = [1, '3-7']", () => {
    expect(normalize({
      highlightLines: [1, '3-7']
    })).toMatchObject({
      highlightLines: [1, 3, 4, 5, 6, 7],
      lineNumbers: false
    })
  })
})
