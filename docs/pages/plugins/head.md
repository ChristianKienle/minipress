# head

## Installation
```sh
npm install @minipress/plugin-head --save
```

## Configuration
```js
module.exports = {
  apply(minipress) {
    minipress.use('@minipress/plugin-head', {
      title: 'My Site Title',
      description: 'My super cool miniPress site'
    })
  }
}
```