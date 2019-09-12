// @ts-check

const { relativePathToUrlPath: toPath } = require('./../')

describe('toPath', () => {
  it('works with index', () => {
    expect(toPath('index.md')).toBe('/')
    expect(toPath('readme.md')).toBe('/')
    expect(toPath('README.md')).toBe('/')
    expect(toPath('INDEX.md')).toBe('/')
  })
  it('works with non-index files', () => {
    expect(toPath('foo.md')).toBe('/foo.html')
    expect(toPath('themes/clean.md')).toBe('/themes/clean.html')
    expect(toPath('themes/minimal/index.md')).toBe('/themes/minimal/')
    expect(toPath('themes/minimal/clean.md')).toBe('/themes/minimal/clean.html')
  })
})
