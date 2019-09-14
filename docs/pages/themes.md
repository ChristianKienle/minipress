# Themes

## Avaiable Themes

### `@minipress/theme-default`
This is the default theme. It is used whenever no theme has been specified. It does not do much.

### `@minipress/theme-docs`
This is the theme that powers this very site.

## Writing a Theme
A theme is nothing special. It is simply a *miniPress* plugin (thus a CommonJS module that follows certain conventions).

``` js
const { join } = require('path')
module.exports = async ({ minipress, options }) => ({
  /* put theme stuff here */
  /* can be {} in case the defaults are good enough */
})
```

The only thing that differentiates a theme from a plugin is the fact that a theme should contain a `default`-layout.
