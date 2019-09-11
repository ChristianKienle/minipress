// // @ts-check
// // Inspired by from Vuepress: https://vuepress.vuejs.org

const Prism = require('prismjs')
// const escapeHtml = require('escape-html')
const loadLanguages = require('prismjs/components/index')
loadLanguages(['typescript', 'markdown', 'markup', 'css', 'javascript'])

// /**
//  * @typedef {object} WrapOptions
//  * @prop {string} html
//  * @prop {string} language
//  */

// /** @param {WrapOptions} options */
// const wrap = ({ html, language }) => {
//   const isText = language === 'text'
//   const html_ = isText ? escapeHtml(html) : html
//   return `<pre class="language-${language}"><code>${html_.trim()}</code></pre>`
// }

// /**
//  * @param {string} string
//  * @param {string} language
//  */
// const highlight = (string, language) => {
//   if (language == null) {
//     return wrap({ html: string, language: 'text' })
//   }
//   let lang = language.toLowerCase()
//   const rawLang = language
//   if (lang === 'vue' || lang === 'html') {
//     lang = 'markup'
//   }
//   if (lang === 'md') {
//     lang = 'markdown'
//   }
//   if (lang === 'rb') {
//     lang = 'ruby'
//   }
//   if (lang === 'ts') {
//     lang = 'typescript'
//   }
//   if (lang === 'py') {
//     lang = 'python'
//   }
//   if (lang === 'sh') {
//     lang = 'bash'
//   }
//   if (lang === 'yml') {
//     lang = 'yaml'
//   }
//   if (lang === 'styl') {
//     lang = 'stylus'
//   }

//   if (!Prism.languages[lang]) {
//     try {
//       loadLanguages([lang])
//     } catch (e) {
//       // eslint-disable-next-line no-console
//       console.error('failed to load language %s', lang, e)
//     }
//   }
//   if (Prism.languages[lang]) {
//     const code = Prism.highlight(string, Prism.languages[lang], lang)
//     return wrap({ html: code.trim(), language: rawLang })
//   }
//   return wrap({ html: string, language: 'text' })
// }

// module.exports = highlight

// const Prism = require('prismjs')
// const loadLanguages = require('./loadLanguages')

const languageAlias = {
  vue: 'html',
  sh: 'bash',
  styl: 'stylus'
}

module.exports = (code, lang) => {
  if (!lang) return Prism.highlight(code, {})

  lang = lang.toLowerCase()

  if (lang in languageAlias) {
    lang = languageAlias[lang]
  }

  if (!Prism.languages[lang]) {
    try {
      loadLanguages(lang)
    } catch (error) {
      // log.warn(error.message)
      return Prism.highlight(code, {})
    }
  }

  const grammer = Prism.languages[lang]

  return Prism.highlight(code, grammer, lang)
}
