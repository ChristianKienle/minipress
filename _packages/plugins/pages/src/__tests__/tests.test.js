// @ts-check
const getPagesInDir = require('./../get-pages-in-dir')
const { join } = require('path')
const fs = require('fs-extra')
const os = require('os')
const { Watcher } = require('@minipress/utils')
const { createVirtualWatcher } = Watcher

class PagesContainer {
  constructor() {
    this.root = fs.mkdtempSync(join(os.tmpdir(), 'plugin-pages-test-'))
    this.isClean = false
  }

  cleanup() {
    if (this.isClean) {
      return
    }
    fs.emptyDirSync(this.root)
    fs.removeSync(this.root)
    this.isClean = true
  }

  /**
   * @param {string} relativePath
   * @param {string=} content
   */
  create(relativePath, content = '') {
    const absolute = this.absolutePathFor(relativePath)
    fs.writeFileSync(absolute, content, 'utf-8')
    return absolute
  }

  /**
   * @param {string} relativePath
   * @param {string=} content
   */
  overwrite(relativePath, content = '') {
    const absolute = this.absolutePathFor(relativePath)
    fs.writeFileSync(absolute, content, 'utf-8')
    return absolute
  }

  /**
   * @param {string} relativePath
   */
  absolutePathFor(relativePath) {
    return join(this.root, relativePath)
  }
}

describe('get pages in dir', () => {
  let container = new PagesContainer()
  let watcher = createVirtualWatcher()
  const createContainer = () => container = new PagesContainer()

  beforeEach(() => {
    watcher.close()
    container.cleanup()
    container = createContainer()
  })

  afterEach(() => {
    watcher.close()
    container.cleanup()
  })

  it('finds index.md in no-watch-mode', async () => {
    const provider = getPagesInDir(container.root, watcher)
    watcher.addFile('index.md')
    const indexMdPath = container.create('index.md', 'hello')
    const pages = await provider.getPages({ watch: false })
    expect(pages).toHaveLength(1)
    const [page] = pages
    expect(page).toMatchObject({
      file: {
        relative: 'index.md',
        absolute: indexMdPath
      }
    })
  })

  it('finds index.vue in no-watch-mode', async () => {
    const provider = getPagesInDir(container.root, watcher)
    const indexPath = container.create('index.vue', 'hello')
    const pages = await provider.getPages({ watch: false })
    expect(pages).toHaveLength(1)
    const [page] = pages
    expect(page).toMatchObject({
      file: {
        relative: 'index.vue',
        absolute: indexPath
      }
    })
  })

  it('finds nothing in empty dir in no-watch-mode', async () => {
    const provider = getPagesInDir(container.root, watcher)
    const pages = await provider.getPages({ watch: false })
    expect(pages).toHaveLength(0)
  })

  it('emits add event', done => {
    expect.assertions(2);
    const indexFn = 'index.vue'
    const indexPath = container.absolutePathFor(indexFn)
    const provider = getPagesInDir(container.root, watcher)
    provider.onAdded(page => {
      expect(page).toMatchObject({
        file: {
          relative: indexFn,
          absolute: indexPath
        }
      })
      provider.close()
      done()
    })
    provider.getPages({ watch: true }).then(pages => {
      expect(pages).toHaveLength(0)
      watcher.addFile(indexFn)
    })
  })

    it('emits add event and change event when something changes', done => {
    expect.assertions(3);
    const indexFn = 'index.vue'
    const indexPath = container.absolutePathFor(indexFn)
    const provider = getPagesInDir(container.root, watcher)
    provider.onAdded(page => {
      expect(page).toMatchObject({
        file: {
          relative: indexFn,
          absolute: indexPath
        }
      })
      setTimeout(() => {
        done()
        watcher.changeFile(indexFn)
      }, 200)
    })
    provider.onChanged(page => {
      expect(page).toMatchObject({
        file: {
          relative: indexFn,
          absolute: indexPath
        }
      })
      setTimeout(() => {
        provider.close()
        done()
      }, 200)
    })
    provider.getPages({ watch: true }).then(pages => {
      expect(pages).toHaveLength(0)
      watcher.addFile(indexFn)
    })
  })
})
