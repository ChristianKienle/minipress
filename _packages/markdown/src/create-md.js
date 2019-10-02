// @ts-check
const { highlight } = require('./utils')
const SaberMarkdown = require('saber-markdown')

class MarkdownRenderer {
  /**
   * @param {object} [env={}]
   */
  static prepareEnv(env = {}) {
    const { Token } = env
    if(Token == null) {
      // @ts-ignore
      env.Token = SaberMarkdown.Token
    }
  }

  constructor() {
    this.md = new SaberMarkdown({
      highlight,
      typographer: true,
      preset: 'default',
      breaks: false,
      html: true
    })
  }

  use(plugin, options) {
    this.md.use(plugin, options)
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
module.exports = () => new MarkdownRenderer()
