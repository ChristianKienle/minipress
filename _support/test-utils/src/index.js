// @ts-check
const TempDir = require('./temp-dir')

module.exports = {
  TempDir,
  createTempDir: () => new TempDir()
}
