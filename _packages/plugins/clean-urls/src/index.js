// @ts-check
// Inspired by https://github.com/vuepress/vuepress-plugin-clean-urls

const PLUGIN = '@minipress/plugin-clean-urls'

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  async apply(minipress, options = {}) {
    const {
      normalSuffix = '',
      indexSuffix = '/',
      notFoundPath = '/404.html',
    } = options
    minipress.hooks.registerPageTransformers.tapPromise(PLUGIN, async () => {
      minipress.pageTransformers.add(async page => {
        const { regularPath, path, frontmatter = {}} = page
        if(regularPath == null) {
          return
        }
        if (regularPath === '/404.html') {
          // path for 404 page
          page.path = notFoundPath
        } else if (regularPath.endsWith('.html')) {
          // normal path
          // e.g. foo/bar.md -> foo/bar.html
          page.path = regularPath.slice(0, -5) + normalSuffix
        } else if (regularPath.endsWith('/')) {
          // index path
          // e.g. foo/index.md -> foo/
          page.path = regularPath.slice(0, -1) + indexSuffix
        }
      })
    })
  }
}
