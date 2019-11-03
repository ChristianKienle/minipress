module.exports = {
  async apply(minipress) {
    await minipress.addPage({
      content: '# index',
      contentType: 'md',
      path: '/',
      key: 'index'
    })
  }
}
