// @ts-check
const transform = require('./../')
const identity = require('./../identity')
const Page = require('./../../../../core/page')
/**
 * @typedef {import('./../../../types').PageTransformer} PageTransformer
 */
describe('transform-page', () => {
  it('handles void', () => {
    expect(transform()).toBe(identity)
  })
  it('handles undefined', () => {
    expect(transform(undefined)).toBe(identity)
  })

  it('handles empty array', () => {
    expect(transform(...[])).toBe(identity)
  })

  it('handles single transformer', async () => {
    /** @type {PageTransformer} */
    const t = async page => {
      page.properties.hello = 'world'
    }
    const _t = transform(t)
    const page = new Page({
      key: '1'
    })
    await _t(page)
    expect(page.properties).toHaveProperty('hello', 'world')
  })

  it('handles multiple transformers', async () => {
    const t = transform([
      async page => page.properties.hello = 't1',
      async page => page.properties.hello = 't2'
    ])
    const page = new Page({ key: '1' })
    await t(page)
    expect(page.properties).toHaveProperty('hello', 't2')
  })
})
