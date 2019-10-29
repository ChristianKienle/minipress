// @ts-check
const comparePosts = require('./../compare-posts')

describe('compare-posts', () => {
  it('handles posts with dates correctly', () => {
    const postLhs = {
      frontmatter: {
        date: new Date(2010, 10, 1)
      }
    }
    const postRhs = {
      frontmatter: {
        date: new Date(2020, 10, 1)
      }
    }
    expect(comparePosts(postLhs, postRhs) > 0).toBe(true)
  })

  it('handles post without date correctly (lhs)', () => {
    const postLhs = {
      frontmatter: {}
    }
    const postRhs = {
      frontmatter: {
        date: new Date(2020, 10, 1)
      }
    }
    expect(comparePosts(postLhs, postRhs) > 0).toBe(true)
  })

  it('handles post without date correctly (rhs)', () => {
    const postLhs = {
      frontmatter: {
        date: new Date(2020, 10, 1)
      }
    }
    const postRhs = {
      frontmatter: {
      }
    }
    expect(comparePosts(postLhs, postRhs) < 0).toBe(true)
  })

})
