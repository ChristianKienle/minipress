// @ts-check

module.exports = {
  apply(minipress) {
    // minipress.pages.createPage({
    //   key: 'virtual',
    //   content: '# virtual',
    //   contentType: 'md',
    // })
    minipress.use('@minipress/theme-default')
    minipress.use('@minipress/plugin-pages')
    minipress.use('@minipress/plugin-additional-pages', async () => {
      return [
        {
          key: 'virtual',
          content: '# virtual',
          contentType: 'md',
        },
        // {
        //   key: 'chris',
        //   path: '/chris.html',
        //   content: '# hello world',
        //   contentType: 'md'
        // }
      ]
    })
  }
}
