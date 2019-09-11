// @ts-check
const { join } = require('path')
const defaultTheme = () => ({
  layouts: join(__dirname, 'src', 'layouts')
})

module.exports = defaultTheme
