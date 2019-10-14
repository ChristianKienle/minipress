
# last-modified
## Installation
```sh
npm install @minipress/plugin-last-modified --save
```

## Configuration
```js
module.exports = {
  plugins: [
    ['@minipress/plugin-last-modified']
  ]
}
```

Then you can access the last modified date like this:

```md
## About this Page
Last Modified: {{ $minipress.page.lastModified }}
```