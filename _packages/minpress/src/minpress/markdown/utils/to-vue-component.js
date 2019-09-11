// @ts-check
/* eslint-env node */
const renderMarkdown = require('./render-markdown')

/**
 * @typedef {import("./frontmatter")} Frontmatter
 *
 * @typedef {object} PreprocessResult
 * @prop {string} processedSource
 * @prop {string=} serializedVueMixin
 *
 * @typedef {(source: string, frontmatter: Frontmatter) => PreprocessResult} Preprocessor
 *
 * @typedef {object} Options
 * @prop {Preprocessor[]} preprocessors
 * @prop {string} source
 */

/**
 * @param {Options} options
 */
const toVueComponent = ({ source, preprocessors }) => {
  const { frontmatter } = renderMarkdown(source)
  let markdownContent = frontmatter.markdownContent
  const serializedMixins = []
  preprocessors.forEach(preprocessor => {
    const result = preprocessor(markdownContent, frontmatter)
    markdownContent = result.processedSource
    if (result.serializedVueMixin != null) {
      serializedMixins.push(result.serializedVueMixin)
    }
  })
  const html = renderMarkdown(markdownContent).html
  // mixins: [${serializedMixins.join(', ')}]

  const component = `<template><div>
  ${html}
  </div></template>
  <script>
  export default {
  }
  </script>
  `
  return component
};

module.exports = toVueComponent
