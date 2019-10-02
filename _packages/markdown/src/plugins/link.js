// @ts-check
const { stringify, pathForRelativeFile } = require('@minipress/utils')

// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>

const renderOutboundLink = () => '<MpOutboundLink />'

module.exports = (md, { externalAttrs }) => {
  function toRouterLink(token, link, relativePath) {
    link[0] = ':to'
    const to = pathForRelativeFile({ href: link[1], currentRelativePagePath: `/${relativePath}` })
    link[1] = `$minipress.pageLink(${stringify(decodeURI(to))})`
    return Object.create(token, {
      tag: { value: 'MiniLink' }
    })
  }
  let hasOpenRouterLink = false
  let hasOpenExternalLink = false

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const { page } = env
    const relativePath = page.file.relative
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /(\/|\.md|\.html|\.vue)(#.*)?$/.test(href)
      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
        if (/_blank/i.test(externalAttrs.target)) {
          hasOpenExternalLink = true
        }
      } else if (isSourceLink) {
        hasOpenRouterLink = true
        tokens[idx] = toRouterLink(token, link, relativePath)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (hasOpenRouterLink) {
      token.tag = 'MiniLink'
      hasOpenRouterLink = false
    }
    if (hasOpenExternalLink) {
      hasOpenExternalLink = false
      // add OutBoundLink to the beforeend of this link if it opens in _blank.
      return `${renderOutboundLink()}${self.renderToken(tokens, idx, options)}`
    }
    return self.renderToken(tokens, idx, options)
  }
}

