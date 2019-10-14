// @ts-check

const { relativePathToUrlPath: toPath } = require('./../')

describe('toPath', () => {
  it('works with index', () => {
    expect(toPath('index.md')).toBe('/')
    expect(toPath('readme.md')).toBe('/')
    expect(toPath('README.md')).toBe('/')
    expect(toPath('INDEX.md')).toBe('/')
  })
  it('works with index (*.vue)', () => {
    expect(toPath('index.vue')).toBe('/')
    expect(toPath('readme.vue')).toBe('/')
    expect(toPath('README.vue')).toBe('/')
    expect(toPath('INDEX.vue')).toBe('/')
  })
  it('works with non-index files (*.vue)', () => {
    expect(toPath('foo.vue')).toBe('/foo.html')
    expect(toPath('themes/clean.vue')).toBe('/themes/clean.html')
    expect(toPath('themes/minimal/index.vue')).toBe('/themes/minimal/')
    expect(toPath('themes/minimal/clean.vue')).toBe('/themes/minimal/clean.html')
  })
})
