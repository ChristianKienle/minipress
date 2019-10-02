// @ts-check
const { join } = require('path')
const normalize = require('./../config')

describe('normalize config', () => {
  it('can handle object when only given cwd', () => {
    const cwd = '/home/chris'
    const config = normalize({ cwd })
    expect(config).toMatchObject({
      cwd,
      dest: join(cwd, '.minipress/dist'),
      tempDir: join(cwd, '.minipress/.temp'),
      port: 4000,
      host: '0.0.0.0',
      build: {
        outDir: join(cwd, 'public'),
        base: '/',
      }
    })
    expect(typeof config.apply).toBe('function')
  })
})
