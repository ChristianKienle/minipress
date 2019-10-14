module.exports = text => (
  text.split('-')
    .map(w => w.replace(/./, m => m.toUpperCase()))
    .join('')
)
