// @ts-check
const { stringify } = require('./../../utils')
const { pathFor } = require('./../../utils/paths')

// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>

const renderOutboundLink = () => '<MpOutboundLink />'

module.exports = (md, {cleanUrls, externalAttrs}) => {
  function toRouterLink(token, link, relativePath) {
    link[0] = ':to'
    const to = pathFor({ href: link[1], currentRelativePagePath: `/${relativePath}` })
    // link[1]

    // convert link to filename and export it for existence check
    // const links = md.$data.links || (md.$data.links = [])
    // links.push(to)


    // relative path usage.
    // if (!to.startsWith('/')) {
    //   to = relativePath
    //     ? url.resolve(`/${relativePath}`, to)
    //     : ensureBeginningDotSlash(to)
    // }

    // const indexMatch = to.match(indexRE)
    // if (indexMatch) {
    //   const [, path, , hash] = indexMatch
    //   to = path + hash
    // } else {
    //   const replaceWith = cleanUrls ? ['', '$1'] : ['.html', 'html$1']

    //   to = to
    //     .replace(/\.md$/, replaceWith[0])
    //     .replace(/\.md(#.*)$/, replaceWith[1])
    //     .replace(/\.md$/, '.html')
    //     .replace(/\.md(#.*)$/, '.html$1')
    // }

    // markdown-it encodes the uri
    link[1] = `$minipress.pageLink(${stringify(decodeURI(to))})`

    // export the router links for testing
    // const routerLinks = md.$data.routerLinks || (md.$data.routerLinks = [])
    // routerLinks.push(to)

    return Object.create(token, {
      tag: { value: 'mp-link' }
    })
  }
  let hasOpenRouterLink = false
  let hasOpenExternalLink = false

  // eslint-disable-next-line camelcase
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const { page } = env
    const relativePath = page.relativePath
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /(\/|\.md|\.html)(#.*)?$/.test(href)
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
      token.tag = 'mp-link'
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

