// @ts-check
const { join } = require('path')

module.exports = function theme() {
  return {
    layouts: join(__dirname, 'src', 'layouts')
  }
}
