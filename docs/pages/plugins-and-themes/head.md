# head

## Installation
```sh
npm install @minipress/plugin-head --save
```

## Configuration
```js
const Head = {
  title: 'My Site Title',
  description: 'My super cool miniPress site'
}

module.exports = {
  plugins: [
    ['@minipress/plugin-head', Head]
  ]
  }
```
