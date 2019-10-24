// @ts-check
const nameFor = require('./../name-for-context')
const { join } = require('path')

/**
 * @param {string} relative
 */
const makeContext = relative => ({ path: { absolute: join('/base', 'dir', relative), relative }})

describe('nameForContext', () => {
  it('transforms dirs', () => {
    expect(nameFor(makeContext('hello/world.vue'))).toEqual('Hello-World')
    expect(nameFor(makeContext('hello/hehe/world.vue'))).toEqual('Hello-Hehe-World')
  })

  it('works on filename basis only', () => {
    expect(nameFor(makeContext('world.vue'))).toEqual('World')
  })
})

