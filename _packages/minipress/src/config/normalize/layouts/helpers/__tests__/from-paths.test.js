// @ts-check
const fromPaths = require('./../from-paths')

describe('from-paths', () => {
  it('works with absoloute paths', () => {
    expect(fromPaths([
      '/hello/world.vue',
      '/bla/hihi.vue'
    ])).toMatchObject({
      world: '/hello/world.vue',
      hihi: '/bla/hihi.vue'
    })
  })

  it('ignores non-vue-files', () => {
    expect(Object.keys(fromPaths([
      '/hello/world.js',
      '/bla/hihi.vu',
      'bla.js'
    ]))).toHaveLength(0)
  })
})
