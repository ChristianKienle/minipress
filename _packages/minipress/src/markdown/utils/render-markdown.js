// @ts-check

const SaberMarkdown = require('saber-markdown')
const getFrontMatter = require('./get-front-matter')
const highlight = require('./highlight')
const taskListPlugin = require('./../plugins/task-list-plugin')
const headingsPlugin = require('./../plugins/headings-plugin')
const linkPlugin = require('./../plugins/link')
const highlightPlugin = require('./../plugins/highlight')

/**
 * @typedef {import("./frontmatter")} Frontmatter
 *
 * @typedef {(source: string) => string} MarkdownRenderer
 *
 * @typedef {object} Options
 * @prop {Preprocessor} preprocess
 * @prop {MarkdownRenderer} renderMarkdown
 */

/** @type {import("saber-markdown")} */
const md = new SaberMarkdown({
  typographer: true,
  preset: 'default',
  breaks: false,
  html: true,
  highlight
  // highlight
})

md.use(taskListPlugin, { disabled: false })
md.use(headingsPlugin)
md.use(linkPlugin, {
  externalAttrs: {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
})
md.use(highlightPlugin)

/**
 * @typedef {import('./../types').MarkdownEnv} MarkdownEnv
 * @param {{source: string; env: MarkdownEnv }} options
 * @returns {{html: string, frontmatter: Frontmatter}}
 */
const renderMarkdown = ({ source, env }) => {
  const frontmatter = getFrontMatter(source)
  const _env = {
    Token: require('saber-markdown').Token,
    ...env
  }
  const html = md.render(frontmatter.markdownContent, _env)
  return { html, frontmatter }
}
module.exports = renderMarkdown
