// @ts-check
class Frontmatter {
  /** @param {import("gray-matter").GrayMatterFile<string>} file */
  constructor(file) {
    this.attributes = file.data
    this.markdownContent = file.content
  }
}

module.exports = Frontmatter
