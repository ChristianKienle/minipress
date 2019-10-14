// @ts-check

const normalize = require('./../build')

describe('normalize build', () => {

  it('respects cwd', () => {
    expect(normalize({ cwd: '/' })).toMatchObject({
      outDir: '/public',
      base: '/'
    })

    expect(normalize({ cwd: '/home' })).toMatchObject({
      outDir: '/home/public',
      base: '/'
    })
  })

  it('respects base', () => {
    expect(normalize({ cwd: '/', build: { base: '/hihi/' } })).toMatchObject({
      outDir: '/public',
      base: '/hihi/'
    })
  })

  it('respects outDir', () => {
    expect(normalize({ cwd: '/', build: { outDir: '/hutzelbrot' } })).toMatchObject({
      outDir: '/hutzelbrot',
      base: '/'
    })
  })

  it('extracts base from pkg if present', () => {
    expect(
      normalize({
        cwd: '/',
        pkg: { homepage: 'https://example.com/hello/' }
      }))
      .toMatchObject({
        outDir: '/public',
        base: '/hello/'
      })
  })

  it('extracts base from pkg if present - and adds trailing slash', () => {
    expect(
      normalize({
        cwd: '/',
        pkg: { homepage: 'https://example.com/hello' }
      }))
      .toMatchObject({
        outDir: '/public',
        base: '/hello/'
      })
  })

  it('uses base if specified in pkg.homepage and build.base', () => {
    expect(
      normalize({
        cwd: '/',
        build: { base: '/overwrite/' },
        pkg: { homepage: 'https://example.com/hello' }
      }))
      .toMatchObject({
        outDir: '/public',
        base: '/overwrite/'
      })
  })

})
