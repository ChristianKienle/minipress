// @ts-check
const createMd = require('./create-md')
const {
  frontmatter: { extract: extractFrontmatter }
} = require('./utils')
const SaberMarkdown = require('saber-markdown')
const createDefaultOptions = require('./create-default-options')

module.exports = class Renderer {

  constructor(options = createDefaultOptions()) {
    this.md = createMd(options)
  }

  /**
  * @param {import('./types').MarkdownItPlugin} plugin
  * @param {any[]} args
  */
  use(plugin, args = []) {
    this.md.use(plugin, args)
    return this
  }

  init() {
    return this
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
