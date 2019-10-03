# additional-pages

## Installation
```sh
npm install @minipress/plugin-additional-pages --save
```

## Configuration
```js
const makePages = () => [{
  contentType: 'md',
  content: '# hello world',
  path: '/hello-world'
}]

module.exports = {
  plugins: [
    ['@minipress/plugin-additional-pages', makePages]
  ]
}
```
