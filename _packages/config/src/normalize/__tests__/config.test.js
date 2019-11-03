// @ts-check
const { join } = require('path')
const normalize = require('./../config')

describe('normalize config', () => {
  it('can handle object when only given cwd', () => {
    const cwd = '/home/chris'
    const config = normalize({ cwd })
    const minipressDir = join(cwd, '.minipress')
    expect(config).toMatchObject({
      cwd,
      dest: join(minipressDir, 'dist'),
      tempDir: join(minipressDir, '.temp'),
      port: 4000,
      host: '0.0.0.0',
      build: {
        outDir: join(minipressDir, 'public'),
        base: '/',
      }
    })
    expect(typeof config.apply).toBe('function')
  })
})
