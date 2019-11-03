// @ts-check
const { normalizePlugin } = require('./../plugin')
const joi = require('@hapi/joi')

/**
 * @typedef {import('@minipress/types').Plugin} ResolvedPlugin
 */

describe('normalizePlugin', () => {
  it('supports array-style without options', async () => {
    const apply = jest.fn().mockResolvedValue({})
    /** @type {ResolvedPlugin} */
    const plugin = { apply }
    const _plugin = normalizePlugin([plugin])
    expect(_plugin.options).toBeUndefined()
    /** @type {import('@minipress/types').MinipressI} */
    // @ts-ignore
    const minipress = {
      joi
    }
    await _plugin.apply(minipress)
    expect(apply.mock.calls).toHaveLength(1)
  })

  it('supports array-style with options', async () => {
    const apply = jest.fn().mockResolvedValue({})
    /** @type {ResolvedPlugin} */
    const plugin = { apply }
    const options = { prop: 'a' }
    const _plugin = normalizePlugin([plugin, options])
    expect(_plugin.options).toEqual(options)
    /** @type {import('@minipress/types').MinipressI} */
    // @ts-ignore
    const minipress = {
      joi
    }
    await _plugin.apply(minipress)
    const { calls } = apply.mock
    const [call] = calls
    expect(calls).toHaveLength(1)
    expect(call).toHaveLength(2)
    expect(call[0]).toBe(minipress)
    expect(call[1]).toEqual(options)
  })

  it('supports array-style with options – and throws if options are invalid', async () => {
    const apply = jest.fn().mockResolvedValue({})
    /** @type {ResolvedPlugin} */
    const plugin = {
      apply,
      optionsSchema() {
        return joi.object({
          firstName: joi.string().valid('chris')
        })
      }
    }
    const invalidOptions = { firstName: 12345 }
    const _plugin = normalizePlugin([plugin, invalidOptions])
    /** @type {import('@minipress/types').MinipressI} */
    // @ts-ignore
    const minipress = {
      joi
    }
    await expect(_plugin.apply(minipress)).rejects.toThrow()
  })

  it('supports resolved plugin (no array)', async () => {
    const apply = jest.fn().mockResolvedValue({})
    /** @type {ResolvedPlugin} */
    const plugin = { apply }
    const _plugin = normalizePlugin(plugin)
    expect(_plugin.options).toBeUndefined()
    /** @type {import('@minipress/types').MinipressI} */
    // @ts-ignore
    const minipress = {
      joi
    }
    await _plugin.apply(minipress)
    const { calls } = apply.mock
    const [call] = calls
    expect(calls).toHaveLength(1)
    expect(call).toHaveLength(2)
    expect(call[0]).toBe(minipress)
    expect(call[1]).toBeUndefined()
  })

})
