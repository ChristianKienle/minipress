// @ts-check
// Inspired by from Vuepress: https://vuepress.vuejs.org
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
loadLanguages(['typescript', 'markdown', 'markup', 'css', 'javascript'])

const languageAlias = {
  vue: 'html',
  sh: 'bash',
  styl: 'stylus'
}

module.exports = (code, lang) => {
  if (!lang) {
    return Prism.highlight(code, {})
  }

  lang = lang.toLowerCase()

  if (lang in languageAlias) {
    lang = languageAlias[lang]
  }

  if (!Prism.languages[lang]) {
    try {
      loadLanguages(lang)
    } catch (error) {
      return Prism.highlight(code, {})
    }
  }
  const grammer = Prism.languages[lang]
  return Prism.highlight(code, grammer, lang)
}
