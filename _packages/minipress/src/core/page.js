// @ts-check
const PageRoute = require('./page-route')
const { fileToPath, stringify } = require('./../utils')
const { join } = require('path')
const fs = require('fs-extra')

/**
 * @typedef {object} MarkdownHeading
 * @prop {string} text
 * @prop {string} slug
 * @prop {string} level
 */
// This class represents a page whose 'origin' is not known or important.
// It could have originated from the minipress config.js-file or by adding it
// later using the minipress-instance.
// The data which is encapsulated by this class will be used to compute the
// siteData.
module.exports = class Page {
  /**
   * @typedef {object} Options
   * @prop {string} key
   * @prop {object=} frontmatter
   * @prop {string} _filePath
   * @prop {string} regularPath
   * @prop {string} relativePath
   * @prop {string=} path
   * @prop {PageRoute=} route
   * @prop {MarkdownHeading[]=} headings
   */

  /** @param {Options} options */
  constructor({
    key,
    _filePath,
    regularPath,
    relativePath,
    path,
    route,
    headings = [],
    frontmatter = {}
  }) {
    this.key = key
    this.frontmatter = frontmatter
    this._filePath = _filePath
    this.regularPath = regularPath
    this.relativePath = relativePath
    this._path = path
    this._route = route
    this.headings = headings
  }

  /**
   * @typedef {object} ProcessOptions
   * @prop {import('./../markdown/renderer')} renderer
   */
  /** @param {ProcessOptions} options */
  async process({ renderer }) {
    const env = {
      page: this
    }
    const source = await fs.readFile(this._filePath, 'utf-8')
    renderer.render(source, env)
  }

  get permalink() {
    return this.path
  }

  /** @param {{outDir: string}} options */
  outputFilePath({ outDir }) {
    const { permalink } = this
    const path = permalink.endsWith('.html') ? permalink : permalink.replace(/\/?$/, '/index.html')
    return join(outDir, path)
  }

  toJSON() {
    return {
      key: this.key,
      path: this.path,
      frontmatter: this.frontmatter,
      layout: this.layout,
      headings: this.headings,
      relativePath: this.relativePath
    }
  }

  stringified() {
    return stringify(this.toJSON())
  }

  /** @returns {string} */
  get path() {
    const { _path, regularPath, frontmatter } = this
    if (_path != null) {
      return _path
    }
    if (frontmatter.path != null) {
      return frontmatter.path
    }
    return fileToPath(regularPath)
  }
  // set path(path) {
  //   this._path = path
  // }

  get route() {
    if (this._route != null) {
      return this._route
    }
    return new PageRoute({
      path: this.path,
      componentPath: this._filePath,
      meta: {
        $type: 'page',
        $page: {
          key: this.key,
          relativePath: this.relativePath
        }
      }
    })
  }

  get layout() {
    const layout = this.frontmatter.layout
    return layout == null ? 'default' : layout
  }
}
