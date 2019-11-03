// @ts-check
const Minipress = require('@minipress/minipress')
const Cli = require('@minipress/cli')
const log = require('@minipress/log')
const { createTempDir } = require('@minipress/test-utils')
const Config = require('@minipress/config')
const serve = require('@minipress/plugin-command-serve/src/serve')
const normalizeConfig = Config.normalize.normalizeConfig
const { join } = require('path')
const fs = require('fs-extra')
const open = require('open')

describe('minipress', () => {
  it('works', async () => {
    const apply = async minipress => {
      minipress.hooks.initialPages.tapPromise('system-test', async () => {
        await minipress.addPage({
          content: `[test](./test.html)`,
          contentType: 'md',
          key: 'index',
          path: '/'
        })
        await minipress.addPage({
          content: `test`,
          contentType: 'md',
          key: 'test',
          path: '/test.html'
        })
      })
    }

    const tempDir = createTempDir()

    const config = normalizeConfig({
      apply,
      cwd: tempDir.path
    })
    const cli = new Cli('minipress')
    const minipress = new Minipress({ config, cli, log })
    await minipress.preparePlugins()

    await minipress.generate({
      outDir: config.build.outDir,
    })
    expect(config.build.outDir).toBeDefined()
    // await open(config.build.outDir)
  })
})