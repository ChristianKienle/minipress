# Plugins & Themes
For *miniPress* plugins and themes are the same thing. There is virtually no difference between a theme and a plugin. However, the term *plugin* is more technical than the term *theme*. Everyone knows what a theme does: It changes the look and feel of your site. When I say *"hey look at this cool plugin I made"* you don't know a thing about what to expect.

That is why within this documentation we still differentiate between *plugins* and *themes* – but only for educational purposes.

> From a technical point of view plugins and themes are identical.

## Available Plugins

| Plugin        | Description |
| ------------- | :------------- |
| [Clean URLs](./clean-urls.md) | Creates clean URLs with *zero* configuration. |
| [Additional Pages](./additional-pages.md) | Add more pages that can be *anywhere* or *anything*. |
| [Head](./head.md) | Take control over everything between `<head>` and `</head>`. |
| [package.json](./package-json.md) | Makes your `package.json` available to your pages. |
| [Last Modified](./last-modified.md) | Adds a last modified date to your pages. |

## Avaiable Themes

### `@minipress/theme-default`
This is the default theme. It is used whenever no theme has been specified. It does not do much.

### `@minipress/theme-docs`
This is the theme that powers this very site.

## Writing a Plugin or Theme

A plugin is a normal NPM package. Its entry point (`main`-file) should export an `object` with an `apply`-function. The `apply`-function will be called by *miniPress* early on:


```js
module.exports = {
  apply(minipress, options) {
    // plugin implementation goes here
  }
}
```

`apply` has access to two things:

1. `minipress`: The *miniPress*-instance.
2. `options`: The plugin options passed to the plugin by the consumer. This can be `undefined` in case no options have been specified. There is no fallback to `{}`.

It is the duty of the plugin developer to do the right thing inside `apply`. You may use any public method on the `minipress`-instance in case you have special needs. The `minipress`-instance opens the door to a very poweful meachnism: **hooks**.

### Hooks
You can use hooks to hook into almost every aspect of *miniPress*. Hooks are called by *miniPress* – you only have to register for all the hooks you want and wait to be called. Just like at the doctors office. Sit still. Don't say a word.

#### `beforeRun`
#### `chainWebpack`
#### `getWebpackConfig`
#### `getHead`
#### `configureSiteData`
#### `emitPages`
#### `emitRoutes`



### `minipress`-Instance

*TODO*

