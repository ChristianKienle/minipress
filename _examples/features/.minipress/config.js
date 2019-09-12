// @ts-check
const { join } = require("path")
const docsTheme = require('@minipress/minipress-theme-docs')

module.exports = {
  theme: docsTheme,
  dest: join(__dirname, 'dist'),
  build: {
    base: '/'
  },
  themeConfig: {
    navbar: {
      items: [
        { text: 'Home', link: '/' },
        { text: 'Markdown', link: '/markdown/' },
        { text: 'Routing', link: '/routing/' },
      ]
    }
  },
  pages: join(__dirname, '..', 'pages'),
}
