// @ts-check
const toComponentName = require('./../path-to-component-name')

describe('path-to-component-name', () => {
  it('works', () => {
    expect(toComponentName('hello.vue')).toEqual('Hello')
    expect(toComponentName('hello/world.vue')).toEqual('Hello-World')
    expect(toComponentName('hello/world-test.vue')).toEqual('Hello-WorldTest')
  })
})
