// @ts-check
const { highlight } = require('./utils')
const SaberMarkdown = require('saber-markdown')
const createDefaultOptions = require('./create-default-options')

class MarkdownRenderer {
  /** @param {object} [env={}] */
  static prepareEnv(env = {}) {
    const { Token } = env
    if (Token == null) {
      // @ts-ignore
      env.Token = SaberMarkdown.Token
    }
  }

  constructor(options = createDefaultOptions()) {
    this.md = new SaberMarkdown(options)
  }

  /**
   * @param {import('./types').MarkdownItPlugin} plugin
   * @param {any[]} args
   */
  use(plugin, args = []) {
    this.md.use(plugin, ...args)
    return this
  }

  /**
   * @param {string} source
   * @param {object=} env
   */
  render(source, env) {
    const _env = env || {}
    MarkdownRenderer.prepareEnv(_env)
    return this.md.render(source, _env)
  }

}
module.exports = (options = createDefaultOptions()) => new MarkdownRenderer(options)
