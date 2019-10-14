# serve-static
This plugin allows you to add static assets to your site.

## Installation
```sh
npm install @minipress/plugin-serve-static --save
```

## Configuration
```js
module.exports = {
  plugis: [
    ['@minipress/plugin-serve-static']
  ]
}
```

By default `@minipress/plugin-serve-static` will serve the `public/`-directory which is in your `cwd`. Suppose you have the following directory structure:

```
.
├── public
│   ├── logo.png
│   └── styles.css
├── minipress.config.js
└── package.json
```

Just by activating the plugin (as described above) will make `public/logo.png` available as `/logo.png` and `public/styles.css` available as `/styles.css`.

If you run `minipress generate` the contents of `public` will be copied to the `outDir`.

## Options
In case you have special needs you can pass options to `'@minipress/plugin-serve-static`:

```js
const { join } = require('path')
module.exports = {
  plugis: [
    ['@minipress/plugin-serve-static', {
      as: '/static',
      dir: join(__dirname, 'static')
    }]
  ]
}
```

As you can see, there are two options to play with:

- `dir`: An absolute path to a directory that will be served statically.
- `as`: How the contents of `dir` should be served. The options above will make everything in `__dirname/static` available under `/static`.