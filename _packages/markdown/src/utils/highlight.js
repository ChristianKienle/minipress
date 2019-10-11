// @ts-check
// Inspired by from Vuepress: https://vuepress.vuejs.org
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
if(loadLanguages) {
  loadLanguages()
}

const languageAlias = {
  vue: 'html',
  sh: 'bash',
  styl: 'stylus',
  js: 'javascript'
}

/**
 * @param {string} lang
 */
const inferGrammerFrom = lang => {
  if(lang == null) {
    return
  }
  let _lang = lang.toLowerCase()
  _lang = languageAlias[_lang] || _lang
  const grammer = Prism.languages[_lang]
  return grammer
}

module.exports = (code, lang) => {
  if (!lang) {
    // @ts-ignore
    return Prism.highlight(code, {})
  }
  const grammer = inferGrammerFrom(lang)
  return Prism.highlight(code, grammer, lang)
}
