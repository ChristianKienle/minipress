// @ts-check
const pathFor = require('./../path-for')
/**
 *
 * @param {string} href
 * @param {string} currentRelativePagePath
 */
const _pathFor = (href, currentRelativePagePath) => pathFor({ href, currentRelativePagePath})

describe('absolutePathFor', () => {
  it('works', () => {
    expect(_pathFor('./guide.md', '/index.md'))
      .toBe('/guide.md')

    expect(_pathFor('./../guide.md', '/themes/index.md'))
      .toBe('/guide.md')
  })
})
