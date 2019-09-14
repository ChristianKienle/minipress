// @ts-check
const pathForRelativeFile = require('./path-for')
const indexRE = /(^|.*\/)(index|readme)\.(md|vue)$/i
const extRE = /\.(vue|md)$/

/** @param {string} file */
const isIndexFile = file => indexRE.test(file)

/** @param {string} relativePath */
const relativePathToUrlPath = relativePath => {
  // Examples for relativePath:
  // 'index.md'
  // 'themes/index.md'
  // 'themes/clean.md'
  // 'themes/minimalist/clean.md'
  // 'themes/minimalist/index.md'
  if (isIndexFile(relativePath)) {
    // README.md -> /
    // README.vue -> /
    // foo/README.md -> /foo/
    // foo/README.vue -> /foo/
    return relativePath.replace(indexRE, '/$1')
  }
  // foo.md -> /foo.html
  // foo.vue -> /foo.html
  // foo/bar.md -> /foo/bar.html
  // foo/bar.vue -> /foo/bar.html
  // return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
  return `/${relativePath.replace(extRE, '').replace(/\\/g, '/')}.html`
}

module.exports = {
  pathForRelativeFile,
  relativePathToUrlPath
}
