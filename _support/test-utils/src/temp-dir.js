const { tmpdir } = require('os')
const { sep } = require('path');
const fs = require('fs-extra')

module.exports = class TempDir {
  constructor() {
    this.path = fs.mkdtempSync(`${tmpdir()}${sep}`)
    this.isClean = false
  }

  cleanup() {
    if(this.isClean) {
      return
    }
    fs.rmdirSync(this.path)
    this.isClean = true
  }
}
