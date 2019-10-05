// @ts-check

const { normalizePage } = require('./../')
const Transformers = require('./../../../transformers')
const ContentComponents = require('./../../../content-components')
const TempDir = require('./../../../temp-dir')
const fs = require('fs-extra')
const OS = require('os')
const nanoid = require('nanoid')
const { join } = require('path')

const createTempDir = () => {
  const path = join(OS.tmpdir(), nanoid())
  fs.mkdirSync(path)
  let cleaned = false
  const cleanup = () => {
    if (cleaned === false) {
      fs.removeSync(path)
    }
    cleaned = true
  }
  const tempDir = new TempDir({ path })
  return {
    tempDir,
    cleanup
  }
}

const MarkdownTransformer = require('@minipress/plugin-format-markdown/src/transformer')

describe('normalize page', () => {
  let { tempDir, cleanup } = createTempDir()
  beforeEach(() => {
    cleanup()
    const dir = createTempDir()
    tempDir = dir.tempDir
    cleanup = dir.cleanup
  })

  afterEach(() => {
    cleanup()
  })

  it('virtual page causes content component to be created', async () => {
    const page = {
      key: 'virtual',
      content: '# hi',
      contentType: 'md',
    }

    const transformers = new Transformers()
    transformers.set('md', MarkdownTransformer())
    const contentComponents = new ContentComponents()
    const _page = await normalizePage(page, {
      transformers, contentComponents, tempDir
    })

    expect(contentComponents.get(_page.key)).toBeDefined()
    expect(_page).toMatchObject(_page)
  })

  it('layout/key/path is read from frontmatter', async () => {
    const content = '---\nlayout: custom\npath: /path\nkey: mykey\n---\n\n# hi'
    const contentType = 'md'
    const page = {
      content,
      contentType
    }

    const transformers = new Transformers()
    transformers.set('md', MarkdownTransformer())
    const contentComponents = new ContentComponents()
    const _page = await normalizePage(page, {
      transformers, contentComponents, tempDir
    })

    // expect(contentComponents.get(page.key)).toMatchObject(page)
    expect(_page).toMatchObject({
      content: '<h1 id=\"hi\"><router-link class=\"header-anchor\" to=\"#hi\" aria-hidden=\"true\">#</router-link> hi</h1>\n',
      contentType,
      key: 'mykey',
      path: '/path',
      layout: 'custom'
    })
  })
})