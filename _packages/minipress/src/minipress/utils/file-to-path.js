// @ts-check
const { relativePathToUrlPath } = require('./paths')
module.exports = relativePathToUrlPath
// const indexRE = /(^|.*\/)(index|readme)\.(md|vue)$/i

// function isIndexFile(file) {
//   return indexRE.test(file)
// }

// const extRE = /\.(vue|md)$/

// /** @param {string} file */
// module.exports = file => {
//   if (isIndexFile(file)) {
//     // README.md -> /
//     // README.vue -> /
//     // foo/README.md -> /foo/
//     // foo/README.vue -> /foo/
//     return file.replace(indexRE, '/$1')
//   }
//   // foo.md -> /foo.html
//   // foo.vue -> /foo.html
//   // foo/bar.md -> /foo/bar.html
//   // foo/bar.vue -> /foo/bar.html
//   // return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
//   return `/${file.replace(extRE, '').replace(/\\/g, '/')}.html`
// }
