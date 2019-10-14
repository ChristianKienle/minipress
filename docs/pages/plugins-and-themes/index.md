# Plugins & Themes

For *miniPress* plugins and themes are the same thing. There is virtually no difference between a theme and a plugin. However, the term *plugin* is more technical than the term *theme*. Everyone knows what a theme does: It changes the look and feel of your site. When I say *"hey look at this cool plugin I made"* you don't know a thing about what to expect.

That is why within this documentation we still differentiate between *plugins* and *themes* – but only for educational purposes.

::: info
From a technical point of view plugins and themes are identical.
:::

## Available Plugins

| Plugin        | Description |
| ------------- | :------------- |
| [Clean URLs](./clean-urls.md) | Creates clean URLs with *zero* configuration. |
| [Additional Pages](./additional-pages.md) | Add more pages that can be *anywhere* or *anything*. |
| [Head](./head.md) | Take control over everything between `<head>` and `</head>`. |
| [package.json](./package-json.md) | Makes your `package.json` available to your pages. |
| [Last Modified](./last-modified.md) | Adds a last modified date to your pages. |
| [Custom Container](./custom-container.md) | Add custom Markdown containers. |
| [Component Documentation](./component-documentation.md) | Automatically generates and renders documentation for your own components. |
| [Summary Container](./summary-container.md) | A custom markdown container that renders `<details>` and `<summary>`-elements. |
| [Deploy to GitHub Pages](./deploy-to-gh-pages.md) | Easily deploy to GitHub Pages. |

## Avaiable Themes

### `@minipress/theme-default`
This is the default theme. It is used whenever no theme has been specified. It does not do much.

### `@minipress/theme-docs`
This is the theme that powers this very site.

#### Installation

``` sh
npm install @minipress/theme-docs --save
```

#### Usage

``` js
module.exports = {
  plugins: [
    ['@minipress/theme-docs', { /* optional theme config */ }]
  ]
}
```

#### Options
`@minipress/theme-docs` has some useful options:

##### navbar

Customize the navigation bar displayed at the top.

```js
const ThemeOptions = {
  navbar: {
    items: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'About', link: '/about/' },
    ]
  }
}

module.exports = {
  plugins: [
    ['@minipress/theme-docs', ThemeOptions]
  ]
}
```


#### Additional Features
`@minipress/theme-docs` also comes with a couple of additional features. There are three custom containers you can choose from:

::: tip
Tips is a tip container.
You can use `:::tip` to display almost any useful information.
:::

::: warn
Tips is a warning container.
Use `:::warn` to display a warning. This is useful to help the user along to get non-obvious things right.
:::

::: error
Tips is an error container.
Use `:::error` to display error messages or highly important information.
:::

The *docs*-theme also comes with a second layout: `hero`. You can see this layout in action by going to the [landing page](/).

It also includes two useful components:

- `MiniFlex`: Can be used to render a flex box.
- `MiniFlexItem`: Use this component inside `MiniFlex` to add content to your flex box.

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
- Hook Type: `AsyncSeriesHook`
- Arguments: *none*

This hook is called right at the start the `run(…)`–method. Almost every CLI-command will end up calling `run(…)` at the start.

#### `chainWebpack`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `chain`: An instance of [webpack-chain.Config](https://github.com/neutrinojs/webpack-chain)
  - `type`: Either `server` or `client`

Called right before a webpack config is requested. This allows you to modify to webpack chain before it is used to create the actual config object.

#### `getWebpackConfig`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `chain`: An instance of [webpack-chain.Config](https://github.com/neutrinojs/webpack-chain)
  - `type`: Either `server` or `client`

Called in order to get a webpack configuration.

#### `getHead`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `head`: An instance of `@minipress/head-element`.
  - `page`: A page object.

Called during the render process (see `src/vue-renderer` for details). This is called multiple times – at least once for each page. Every time a page is rendered – at some point we need to create the `<head>`-element. This hook allows you to modify the head of each page.

#### `configureSiteData`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `siteData`: In the beginning this is just `{}`. Then each hook can mutate this object in order to add more site specfic data.

#### `emitSiteData`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `siteData`: The site data (type `object`) that needs to be emitted.

#### `emitPages`
#### `emitRoutes`

## `minipress`-Instance API

### registerComponent(id, path)
Call this method to register a Vue component globally.

**Arguments**
- `id`
  - **Type:** `String`
  - **Description:** The name of the component to register.
- `path`
  - **Type:** `String`
  - **Description:** The absolute path to the component to register.

### registerLayout(id, path)
Call this method to register a layout component.

**Arguments**
- `id`
  - **Type:** `String`
  - **Description:** The name of the layout to register.
- `path`
  - **Type:** `String`
  - **Description:** The absolute path to the layout component to register.

### registerAlias(name, path)
Call this method to register a [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias).

**Arguments**
- `name`
  - **Type:** `String`
  - **Description:** The name of the alias you want to register.
- `path`
  - **Type:** `String`
  - **Description:** The absolute path to a file that should be used when resolving the alias.

### registerDynamicModule(name, path)
Call this method to register a dynamic module.

**Arguments**
- `name`
  - **Type:** `String`
  - **Description:** The name of the dynamic module you want to register.
- `code`
  - **Type:** `String`
  - **Description:** The raw code of the dynamic module.

**Example**
Register the module in your configuration file or in your plugin implementation:

```js
const code = `
export default () => console.log('hi there 😌')
`
minipress.registerDynamicModule('sayHi', code)
```

In any of your `*.vue`-files:

```js
import SayHi from '#minipress/dynamic/sayHi'
SayHi() // → 'hi there 😌'
```

### addAppEnhancer(code)
This method allows you to add an *app enhancer*.

**Arguments**
- `code`
  - **Type:** `String`
  - **Description:** The raw code of the enhancer.

An *app enhancer* is similar to a *dynamic module*. The difference is that *app enhancers* are automatically imported and called by *miniPress* very early on. This allows you to access the `Vue`-constructor or do other things I can't think of right now.

**Example**
```js
const code = `
export default ({ Vue }) => {
  // Access the Vue-constructor here.
  // e.g.: Vue.component(…) or Vue.use(…).
}
`
minipress.addAppEnhancer(code)
```

::: warn
The default export of your *app enhancer* must be a function. Otherwise things will not work.
:::

*miniPress* will call the function you expose automatically as early as possible.

### joi
This property returns the [@hapi/joi](https://hapi.dev/family/joi) default export. *Joi* is exposed on the *miniPress*-instance for convenience purposes only. You can use it to create new schemas.

### addPage(page)
This method allows you to add a single page to *miniPress*.

**Arguments**
- `page`
  - **Type:** `Page`
  - **Description:** The page which you want to add.

### removePage(key)
This method allows you to remove a single page from *miniPress*.

**Arguments**
- `key`
  - **Type:** `String`
  - **Description:** The key of the page you want to remove.

### removePageWhere(condition)
This method allows you to remove a single page from *miniPress* that matches a certain condition.

**Arguments**
- `condition`
  - **Type:** `(page: Page) => boolean`
  - **Description:** A function that will be called by *miniPress*. Within your implementation you have access to a page. Return `true` to remove that page.
