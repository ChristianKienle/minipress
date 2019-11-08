// @ts-check
const markdownItContainer = require('markdown-it-container')

const defaultRenderBefore = ({ title = '' }) => `<div><div><strong>${title}</strong></div>`
const defaultRenderAfter = () => '</div>'

/**
 * @param {import('markdown-it')} md
 * @param {import('./custom-container-types').Options} options
 */
module.exports = (md, options) => {
  const {
    type,
    defaultTitle,
    renderBefore = defaultRenderBefore,
    renderAfter = defaultRenderAfter
  } = options
  const TYPE_RE = new RegExp(`^${type}\\s+(.*)`, 'gi')

  const normalizeTitle = title => title.length === 0 ? defaultTitle : title
  const validate = params => {
    const p = params.trim()
    return p === type ||  p.match(TYPE_RE);
  }
  const render = (tokens, idx) => {
    const typeAndTitle = tokens[idx].info.trim()
    if (tokens[idx].nesting === 1) {
      const title = normalizeTitle(typeAndTitle.substring(type.length).trim())
      return renderBefore({ title });
    }
    return renderAfter()
  }
  markdownItContainer(md, type, { render, validate });
}
