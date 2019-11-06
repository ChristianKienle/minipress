// @ts-check

const normalize = require('./../content-type')

describe('content type can be normalized', () => {
  it('with contentType missing and file = {}', () => {
    expect(normalize({ file: {} })).toBe('default')
  })

  it('with contentType missing and file.relative set', () => {
    expect(normalize({ file: { relative: 'hi.vue' } })).toBe('vue')
    expect(normalize({ file: { relative: 'hi.md' } })).toBe('md')
    expect(normalize({ file: { relative: 'hi.xxx' } })).toBe('xxx')
    expect(normalize({ file: { relative: 'hello/world/bla.vue' } })).toBe('vue')
    expect(normalize({ file: { relative: 'hello/world/bla.md' } })).toBe('md')
    expect(normalize({ file: { relative: 'hello/world/bla.xxx' } })).toBe('xxx')
  })

  it('with contentType missing and file.absolute set', () => {
    expect(normalize({ file: { absolute: '/hi.vue' } })).toBe('vue')
    expect(normalize({ file: { absolute: '/hi.md' } })).toBe('md')
    expect(normalize({ file: { absolute: '/hi.xxx' } })).toBe('xxx')
    expect(normalize({ file: { absolute: '/hello/world/bla.vue' } })).toBe('vue')
    expect(normalize({ file: { absolute: '/hello/world/bla.md' } })).toBe('md')
    expect(normalize({ file: { absolute: '/hello/world/bla.xxx' } })).toBe('xxx')
  })
})