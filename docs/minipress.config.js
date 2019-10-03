// @ts-check

const themeConfig = {
  navbar: {
    items: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Configuration', link: '/configuration/' },
      { text: 'Features', link: '/features/' },
      // { text: 'Themes', link: '/themes/' },
      { text: 'Plugins & Themes', link: '/plugins-and-themes/' },
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
  plugins: [
    ['@minipress/theme-docs', themeConfig],
    ['@minipress/plugin-pages'],
    ['@minipress/plugin-components'],
    ['@minipress/plugin-head', head],
    ['@minipress/plugin-last-modified'],
    ['@minipress/plugin-clean-urls'],
    ['@minipress/plugin-package-json']
  ],
  /** @param {import('@minipress/minipress/src/core/minipress/minipress')} minipress */
  apply(minipress) {},
  build: {
    base: '/minipress/'
  }
}
