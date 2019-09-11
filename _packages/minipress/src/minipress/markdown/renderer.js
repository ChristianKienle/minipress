// @ts-check

const SaberMarkdown = require('saber-markdown')
const getFrontMatter = require('./utils/get-front-matter')
const highlight = require('./utils/highlight')
const taskListPlugin = require('./plugins/task-list-plugin')
const headingsPlugin = require('./plugins/headings-plugin')
const linkPlugin = require('./plugins/link')
const highlightPlugin = require('./plugins/highlight')

module.exports = class Renderer {
  constructor() {
    this.md = new SaberMarkdown({
      typographer: true,
      preset: 'default',
      breaks: false,
      html: true,
      highlight
    })
  }

  init({ cleanUrls } = { cleanUrls: true }) {
    this.md
      .use(headingsPlugin)
      .use(highlightPlugin)
      .use(linkPlugin, {
        cleanUrls,
        externalAttrs: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      })
      .use(taskListPlugin, {
        disabled: false
      })
  }

  /**
   * @typedef {import("./utils/frontmatter")} Frontmatter
   * @typedef {import('./types').MarkdownEnv} MarkdownEnv
   * @param {string} source
   * @param {MarkdownEnv} env
   * @returns {{ html: string, frontmatter: Frontmatter }}
  */
  render(source, env) {
    const frontmatter = getFrontMatter(source)
    const _env = {
      // @ts-ignore
      Token: SaberMarkdown.Token,
      ...env
    }
    const html = this.md.render(frontmatter.markdownContent, _env)
    return { html, frontmatter }
  }
}