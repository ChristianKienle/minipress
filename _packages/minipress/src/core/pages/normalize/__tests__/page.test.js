// @ts-check

const { normalizePage } = require('./../')
const Transformers = require('./../../../transformers')
const ContentComponents = require('./../../../content-components')
const { createTempDir } = require('@minipress/utils')
const MarkdownTransformer = require('@minipress/plugin-format-markdown/src/transformer')
const { join } = require('path')

describe('normalize page', () => {
  let tempDir = createTempDir()
  beforeEach(() => {
    tempDir.cleanup()
    tempDir = createTempDir()
  })

  afterEach(() => {
    tempDir.cleanup()
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

    expect(_page).toMatchObject({
      content: '<h1 id=\"hi\"><router-link class=\"header-anchor\" to=\"#hi\" aria-hidden=\"true\">#</router-link> hi</h1>\n',
      contentType,
      key: 'mykey',
      path: '/path',
      layout: 'custom'
    })
  })

  it('layout/key/path is read from frontmatter of file on disk', async () => {
    const absolutePath = join(__dirname, 'fixtures', 'page-with-key.md')
    const page = {
      file: {
        absolute: absolutePath
      }
    }

    const transformers = new Transformers()
    transformers.set('md', MarkdownTransformer())
    const contentComponents = new ContentComponents()
    const _page = await normalizePage(page, {
      transformers, contentComponents, tempDir
    })

    expect(_page).toMatchObject({
      content: '<p>hello world</p>\n',
      contentType: 'md',
      key: 'page-key'
    })
  })
})