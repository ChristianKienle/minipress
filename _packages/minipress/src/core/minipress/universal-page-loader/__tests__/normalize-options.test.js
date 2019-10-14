// @ts-check
const normalizeOptions = require('./../normalize-options')
// const Minipress = require('./../../minipress')

describe('normalize page-loader options', () => {
  it('works for valid options', () => {
    const minipress = {}
    const [options, error] = normalizeOptions({ minipress })
    expect(options).toBeDefined()
    expect(error).toBe(null)
    expect(options && options.minipress).toBe(minipress)
  })

  it('returns error for undefined', () => {
    const [options, error] = normalizeOptions()
    expect(options).toBe(null)
    expect(error).toBeInstanceOf(Error)
  })

  it('returns error for {}', () => {
    const [options, error] = normalizeOptions({})
    expect(options).toBe(null)
    expect(error).toBeInstanceOf(Error)
  })
})
