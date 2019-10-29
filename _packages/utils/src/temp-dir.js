const { tmpdir } = require('os')
const { sep, resolve, parse } = require('path')
const fs = require('fs-extra')
const { readFileSync, pathExistsSync, writeFileSync, emptyDirSync, openSync } = fs

const createPath = () => fs.mkdtempSync(`${tmpdir()}${sep}`)

module.exports = class TempDir {
  /**
   * @typedef {object} Options
   * @prop {string=} path
   */

  /** @param {Options} options */
  constructor({ path } = { path: createPath() }) {
    this.path = path || createPath()
    this.isClean = false
  }

  cleanup() {
    if (this.isClean) {
      return
    }
    const tempDir = this._ensureTempDir()
    if (tempDir == null) {
      return
    }
    emptyDirSync(tempDir)
    fs.rmdirSync(this.path)
    this.isClean = true
  }

  tempPath() {
    return this._ensureTempDir()
  }

  clean() {
    this.cleanup()
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
    fs.ensureDirSync(dir)
    return dir
  }

  _ensureTempDir() {
    const tempDir = this.path
    return this._ensureDirectory(tempDir)
  }
}
