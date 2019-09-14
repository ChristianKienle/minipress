# additional-pages

## Installation
```sh
npm install @minipress/plugin-additional-pages --save
```

## Configuration
```js
module.exports = {
  apply(minipress) {
    const makePages = () => [
      {
        contentType: 'md',
        content: '# hello world',
        path: '/hello-world'
      }
    ]
    minipress.use('@minipress/plugin-additional-pages', makePages)
  }
}
```
