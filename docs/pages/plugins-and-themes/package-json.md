# package-json

## Installation
```sh
npm install @minipress/plugin-package-json --save
```

## Configuration
```js
module.exports = {
  plugis: [
    ['@minipress/plugin-package-json']
  ]
}
```

Then you can access your `package.json`-file like this:

```md
## My Package Name
Last Modified: {{ $minipress.site.pkg.name }}
```

`$minipress.site.pkg` gives you access to your whole `package.json`-file. By default `@minipress/plugin-package-json` will use the `package.json` that is located in `cwd`. You can override that by passing an absolute path as the second argument of `use(…)`.
