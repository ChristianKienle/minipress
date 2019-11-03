// @ts-check
const Pages = require('./../')
const { createTempDir } = require('@minipress/utils')
const PageTransformers = require('./../../page-transformers')
const Transformers = require('./../../transformers')
const ContentComponents = require('./../../content-components')
const Aliases = require('./../../aliases')

describe('Pages', () => {
  it('page transformer is applied', async () => {
    const tempDir = createTempDir()
    const contentComponents = new ContentComponents()
    const pageTransformers = new PageTransformers()
    const transformers = new Transformers()
    const aliases = new Aliases()

    const pageTransformer = jest.fn()
    pageTransformers.add(pageTransformer)

    const pages = new Pages({
      tempDir,
      transformers,
      pageTransformers,
      contentComponents,
      aliases
    })

    const indexPage = await pages.createPage({
      content: '[Test](./test.md)',
      contentType: 'md',
      key: 'index',
      path: '/'
    })

    // ensure that the transformer has been called…
    expect(pageTransformer).toHaveBeenCalled()
    const args = pageTransformer.mock.calls[0]
    // …with the page as the only argument
    expect(args).toHaveLength(1)
    expect(args[0]).toMatchObject(indexPage)
  })
})
