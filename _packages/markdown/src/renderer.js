// @ts-check
const SaberMarkdown = require('saber-markdown')
const {
  frontmatter: { extract: extractFrontmatter },
  highlight
} = require('./utils')
const plugins = require('./plugins')

module.exports = class Renderer {
  constructor() {
    this.md = new SaberMarkdown({
      highlight,
      typographer: true,
      preset: 'default',
      breaks: false,
      html: true
    })
  }

  init() {
    const { link, headings, highlight: highlightPlugin, taskList } = plugins
    this.md
      .use(headings)
      .use(highlightPlugin)
      .use(link, {
        externalAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      })
      .use(taskList, {
        disabled: false
      })
  }

  /**
   * @typedef {import("./utils/frontmatter/frontmatter")} Frontmatter
   * @typedef {import('./types').MarkdownEnv} MarkdownEnv
   * @param {string} source
   * @param {MarkdownEnv} env
   * @returns {{ html: string, frontmatter: Frontmatter }}
  */
  render(source, env) {
    const frontmatter = this.frontmatter(source)
    const _env = {
      // @ts-ignore
      Token: SaberMarkdown.Token,
      ...env
    }
    const { page } = env
    if (page != null) {
      // page.frontmatter = frontmatter.attributes
    }
    const html = this.md.render(frontmatter.markdownContent, _env)
    return { html, frontmatter }
  }

  /**
   * @param {string} source
   * @param {MarkdownEnv} env

   * @returns {string}
  */
  _render(source, env) {
    const _env = {
      // @ts-ignore
      Token: SaberMarkdown.Token,
      ...env
    }
    return this.md.render(source, _env)
  }

  frontmatter(source) {
    return extractFrontmatter(source)
  }
}
