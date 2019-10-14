// @ts-check

const normalize = require('./../build')

describe('normalize build', () => {

  it('respects cwd', () => {
    expect(normalize({ minipressDir: '/.minipress' })).toMatchObject({
      outDir: '/.minipress/public',
      base: '/'
    })

    expect(normalize({ minipressDir: '/.minipress' })).toMatchObject({
      outDir: '/.minipress/public',
      base: '/'
    })
  })

  it('respects base', () => {
    expect(normalize({ minipressDir: '/.minipress', build: { base: '/hihi/' } })).toMatchObject({
      outDir: '/.minipress/public',
      base: '/hihi/'
    })
  })

  it('respects outDir', () => {
    expect(normalize({ minipressDir: '/.minipress', build: { outDir: '/hutzelbrot' } })).toMatchObject({
      outDir: '/hutzelbrot',
      base: '/'
    })
  })

  it('extracts base from pkg if present', () => {
    expect(
      normalize({
        minipressDir: '/.minipress',
        pkg: { homepage: 'https://example.com/hello/' }
      }))
      .toMatchObject({
        outDir: '/.minipress/public',
        base: '/hello/'
      })
  })

  it('extracts base from pkg if present - and adds trailing slash', () => {
    expect(
      normalize({
        minipressDir: '/.minipress',
        pkg: { homepage: 'https://example.com/hello' }
      }))
      .toMatchObject({
        outDir: '/.minipress/public',
        base: '/hello/'
      })
  })

  it('uses base if specified in pkg.homepage and build.base', () => {
    expect(
      normalize({
        minipressDir: '/.minipress',
        build: { base: '/overwrite/' },
        pkg: { homepage: 'https://example.com/hello' }
      }))
      .toMatchObject({
        outDir: '/.minipress/public',
        base: '/overwrite/'
      })
  })

})
