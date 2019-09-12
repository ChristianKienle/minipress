// @ts-check
const normalizeLayouts = require('./..')

describe('normalizeLayouts', () => {
  it('works with undefined', () => {
    expect(normalizeLayouts()).toEqual({})
  })
})
