// @ts-check
const Chain = require('./../chain')

describe('chain', () => {
  it('has no plugins when empty', () => {
    const chain = new Chain()
    expect(chain.plugins()).toHaveLength(0)
  })

  it('has 1 plugin even when only given a name', () => {
    const chain = new Chain()
    chain.plugin('test').end()
    expect(chain.plugins()).toHaveLength(1)
  })

  it('has 2 plugins even when only given a name', () => {
    const chain = new Chain()
    chain
      .plugin('plugin-a')
    .end()
      .plugin('plugin-b')
    .end()

    expect(chain.plugins()).toHaveLength(2)
  })

  it('respects order when none is given', () => {
    const chain = new Chain()
    chain
      .plugin('plugin-a')
    .end()
      .plugin('plugin-b')
    .end()
    const plugins = chain.plugins()

    expect(plugins).toHaveLength(2)
    expect(plugins[0].name).toBe('plugin-a')
    expect(plugins[1].name).toBe('plugin-b')
  })

  it('respects order when a plugin is ordered in front of another one using before(…)', () => {
    const chain = new Chain()
    chain
      .plugin('plugin-a')
    .end()
      .plugin('plugin-b')
      .before('plugin-a')
    .end()
    const plugins = chain.plugins()

    expect(plugins).toHaveLength(2)
    expect(plugins[0].name).toBe('plugin-b')
    expect(plugins[1].name).toBe('plugin-a')
  })
})