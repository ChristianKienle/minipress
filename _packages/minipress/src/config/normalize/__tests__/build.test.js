// @ts-check

const normalize = require('./../build')

describe('normalize build', () => {
  it('respects cwd', () => {
    expect(normalize({ cwd: '/'})).toMatchObject({
      outDir: '/public',
      base: '/'
    })
    expect(normalize({ cwd: '/home'})).toMatchObject({
      outDir: '/home/public',
      base: '/'
    })
  })

  it('respects base', () => {
    expect(normalize({ cwd: '/', build: { base: '/hihi/' }})).toMatchObject({
      outDir: '/public',
      base: '/hihi/'
    })
  })

  it('respects outDir', () => {
    expect(normalize({ cwd: '/', build: { outDir: '/hutzelbrot' }})).toMatchObject({
      outDir: '/hutzelbrot',
      base: '/'
    })
  })
})
