// @ts-check
const inDir = require('./../components-in-dir')
const { createTempDir } = require('@minipress/test-utils')
const { join } = require('path')

describe('components-in-dir', () => {
  /** @type {import('@minipress/test-utils/src/temp-dir')} */
  let tempDir
  beforeEach(() => {
    if(tempDir != null) {
      tempDir.cleanup()
    }
    tempDir = createTempDir()
  })
  afterEach(() => {
    if(tempDir != null) {
      tempDir.cleanup()
    }
  })

  it('works even when dir does not exist', async () => {
    const componentsDir = join(tempDir.path, 'does-not-exist')
    const provider = inDir({
      components: componentsDir,
      getComponentName(_, defaultName) {
        return defaultName
      }
    })
    const components = await provider.getComponents()
    expect(components).toHaveLength(0)
  })
})
