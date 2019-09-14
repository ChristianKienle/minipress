// @ts-check

const themeConfig = {
  navbar: {
    items: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Configuration', link: '/configuration/' },
      { text: 'Features', link: '/features/' },
      { text: 'Themes', link: '/themes/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'GitHub', link: '/404' },
      // { text: 'Internals', link: '/internals/' },
    ]
  }
}

const head = {
  title: 'miniPress',
  description: 'Build Static Sites – super easy.'
}

module.exports = {
  /** @param {import('@minipress/minipress/src/core/minipress/minipress')} minipress */
  apply(minipress) {
    minipress.use('@minipress/theme-docs', themeConfig)
    minipress.use('@minipress/plugin-pages')
    minipress.use('@minipress/plugin-components')
    minipress.use('@minipress/plugin-head', head)
    minipress.use('@minipress/plugin-last-modified')
    minipress.use('@minipress/plugin-clean-urls')
    minipress.use('@minipress/plugin-package-json')
  },
  head: {
    title: 'miniPress',
    description: 'A minimalistic static site generator'
  },
  build: {
    base: '/minipress/'
  }
}
