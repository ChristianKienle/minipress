// @ts-check
const Path = require('path')

/**
 * This function returns the given string without the query and
 * fragment (if present). For example, it will turn
 * 'hello/index.md?foo=bar#helloworld' -> 'hello/inex.md'
 * @param {string} path
 * @returns {string=}
 */
const withoutQueryAndFragment = path => {
  const regex = /^([^#?]+)([#?].*)?$/
  const matches = regex.exec(path)
  // Assuming path is 'hello/index.md?foo=bar#helloworld',
  // `matches` has now the following content:
  // matches[0] = hello/index.md?foo=bar#helloworld
  // matches[1] = hello/index.md
  // matches[2] = ?foo=bar#helloworld
  if(matches == null) {
    return
  }
  if(matches.length < 2) {
    throw Error(`Serious internal error: given path ('${path}') seems to be malformed`)
  }
  return matches[1]
}

/**
 * @typedef {object} Options
 * @prop {string} href the text between '()' in a markdown link: [Link]($href)
 * @prop {string} currentRelativePagePath the relative path of the page the link is on
 */
const pathFor = ({
  href,
  currentRelativePagePath
}) => {
  const to = withoutQueryAndFragment(href) || href
  return Path.resolve(
    Path.dirname(currentRelativePagePath),
    to
  )
}
module.exports = pathFor
