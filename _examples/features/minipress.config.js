// @ts-check
module.exports = {
  theme: ['@minipress/theme-docs', {
    navbar: {
      items: [
        { text: 'Home', link: '/' },
        { text: 'Markdown', link: '/markdown/' },
        { text: 'Routing', link: '/routing/' },
      ]
    }
  }],
  plugins: [
    ['@minipress/plugin-clean-urls', {}],
    [
      '@minipress/plugin-additional-pages',
      {
        pages: [
          {
            path: '/helloworld/',
            content: '# helloworld'
          }
        ]
      }
    ]
  ],
  build: {
    base: '/'
  }
}
