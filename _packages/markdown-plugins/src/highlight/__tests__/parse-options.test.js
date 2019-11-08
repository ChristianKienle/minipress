// @ts-check
const parse = require('./../parse-options')

describe('highlight markdown plugin – parseOptions', () => {
  it('works for highlightLines:[1]', () => {
    expect(
      parse('js { highlightLines:[1] }'))
      .toMatchObject({
        highlightLines: [1]
      })
  })

  it('works for no options', () => {
    expect(parse('js')).toMatchObject({})
  })

  it('works for void', () => {
    expect(parse("js {highlightLines: ['1-2']}")).toMatchObject({
      highlightLines: ['1-2']
    })
  })

  it('works for range', () => {
    expect(parse('js')).toMatchObject({})
  })

  it('returns error for invalid options', () => {
    expect(parse('js { #####invalid##### }')).toBeInstanceOf(Error)
  })
})