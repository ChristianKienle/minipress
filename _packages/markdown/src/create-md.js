// @ts-check
const { highlight } = require('./utils')
const SaberMarkdown = require('saber-markdown')

module.exports = () => new SaberMarkdown({
  highlight,
  typographer: true,
  preset: 'default',
  breaks: false,
  html: true
})
