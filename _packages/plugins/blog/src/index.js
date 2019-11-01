// @ts-check
const PLUGIN = '@minipress/plugin-blog'
const { join } = require('path')
const PagesPlugin = require('@minipress/plugin-pages')
const defaultComparePosts = require('./utils/compare-posts')
const ExcerptPlugin = require('@minipress/plugin-excerpt')

const Path = require('path')

const dirContainsFile = (dir, file) => {
  const relative = Path.relative(dir, file)
  if(relative.length === 0) {
    return false
  }
  return relative && !relative.startsWith('..') && !Path.isAbsolute(relative)
}

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress, options) {
    await ExcerptPlugin.apply(minipress)
    // @ts-ignore
    await PagesPlugin.apply(minipress, options.posts)

    const { hooks, pageTransformers } = minipress

    hooks.configureSiteData.tapPromise(PLUGIN, async siteData => {
      const pageRepresentsPost = page => page._isPost === true
      const pages = minipress.pages.values()
      const posts = pages.filter(pageRepresentsPost)
      // @ts-ignore
      siteData.posts = [...posts].sort(options.comparePosts)
    })

    hooks.registerPageTransformers.tapPromise(PLUGIN, async () => {
      const setPostPath = async page => {
        const { file, path } = page
        if(file == null) {
          return
        }
        const { absolute } = file
        if(absolute == null) {
          return
        }
        if(dirContainsFile(options.posts, absolute) === false) {
          return
        }
        page._isPost = true
        page.title = page.frontmatter.title || ''
        if(path == null) {
          return
        }
        if(path.startsWith(options.path)) {
          return
        }
        page.path = `${options.path}${page.path.substring(1)}`
      }
      pageTransformers.add(setPostPath)
    })
  },
  optionsSchema({ joi, config }) {
    const posts = join(config.cwd, 'posts')
    const path = '/blog/'
    return joi.object({
      posts: joi.string().default(posts),
      path: joi.string().default(path),
      comparePosts: joi.function().default(defaultComparePosts)
    }).default({
      posts,
      path,
      comparePosts: defaultComparePosts
    })
  },
}
