// @ts-check
const { resolve, parse } = require('path')
const { pathExistsSync, readFileSync, emptyDirSync, writeFileSync, mkdirSync, openSync, fstatSync } = require('fs-extra')

/**
 * @typedef {object} Options
 * @prop {string} path
 */
module.exports = class TempDir {
  /** @param {Options} options */
  constructor({ path }) {
    this.path = path
  }

  tempPath() {
    return this._ensureTempDir()
  }

  clean() {
    const tempDir = this._ensureTempDir()
    if (tempDir == null) {
      return
    }
    emptyDirSync(tempDir)
  }

  /**
   * @param {string} relativePath
   * @param {string} content
   */
  writeTemp(relativePath, content) {
    const path = this._absolutePathForTempFile(relativePath)
    if (path == null) {
      throw Error(`Unable to write temporary file '${path}' because temporary directory could not be determined. This is a serious error. We can't proceed.`)
    }
    writeFileSync(path, content, 'utf-8')
    return path
  }
  /**
   * @param {string} relativePath
   */
  existsSync(relativePath) {
    const path = this._absolutePathForTempFile(relativePath)
    if (path == null) {
      throw Error(`Unable to read temporary file '${path}' because temporary directory could not be determined. This is a serious error. We can't proceed.`)
    }
    return pathExistsSync(path)
  }

  /**
   * @param {string} relativePath
   */
  readSync(relativePath) {
    const path = this._absolutePathForTempFile(relativePath)
    if (path == null) {
      throw Error(`Unable to read temporary file '${path}' because temporary directory could not be determined. This is a serious error. We can't proceed.`)
    }
    return readFileSync(path, 'utf-8')
  }

  /**
   * @param {string} relativePath
   */
  resolveTemp(relativePath) {
    const path = this._absolutePathForTempFile(relativePath)
    if (path == null) {
      throw Error(`Unable to resolve temporary file '${path}' because temporary directory could not be determined. This is a serious error. We can't proceed.`)
    }
    return path
  }

  /** @param {string} relativePath */
  _absolutePathForTempFile(relativePath) {
    const tempDir = this._ensureTempDir()
    if (tempDir == null) {
      return
    }
    const path = parse(relativePath)
    // If 'relativePath' is a simple string without any slashes then
    // 'path.dir' will be ''. In that case the directory for the file
    // is simply the temporary directory itself. We don't have to do
    // anything.
    const targetDir = path.dir
    const noDirRequired = targetDir === ''
    if (noDirRequired) {
      return resolve(tempDir, relativePath)
    }
    const absoluteDir = resolve(tempDir, path.dir)
    this._ensureDirectory(absoluteDir)
    return resolve(absoluteDir, path.name + path.ext)
  }

  /** @param {string} dir */
  _ensureDirectory(dir) {
    try {
      const fd = openSync(dir, 'r')
      const stat = fstatSync(fd)
      if (stat.isDirectory()) {
        return dir
      }
    } catch (err) {
      mkdirSync(dir, { recursive: true })
      return dir
    }
  }

  _ensureTempDir() {
    const tempDir = this.path
    return this._ensureDirectory(tempDir)
  }
}
