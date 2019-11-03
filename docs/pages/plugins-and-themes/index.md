# Plugins & Themes

For *miniPress* plugins and themes are the same thing. There is virtually no difference between a theme and a plugin. However, the term *plugin* is more technical than the term *theme*. Everyone knows what a theme does: It changes the look and feel of your site. When I say *"hey look at this cool plugin I made"* you don't know a thing about what to expect.

That is why within this documentation we still differentiate between *plugins* and *themes* – but only for educational purposes.

::: info
From a technical point of view plugins and themes are identical.
:::

## Available Plugins
There are a couple of built-in plugins.


### blog
This plugin helps you to build a custom blog.

**Installation**

```sh
npm install @minipress/plugin-blog --save
```

**Configuration**

```js
module.exports = {
  plugins: ['@minipress/plugin-blog']
}
```

**Usage**
You create a post by adding a markdown file inside your `posts`-directory. A post is a almost normal markdown page.

::: warn
Make sure that your posts have a frontmatter `title`-attribute.
:::

Here is a *hello world*-post:

```md
---
title: Hello World
---

Hello Blog!

<!-- more -->

I am the **actual** content of the post.
Using the `more`-comment is optional.
```

The **blog**-plugin will add a `posts`-attribute to `$minipress.site`. You can use this attribute to create a list of your posts.

**Options**

`@minipress/plugin-blog` can be configured in case the defaults don't work for you.

- `posts` – default: `$cwd/posts`: Absolute path to a directory which contains your posts.
- `path` – default: `/blog/`: Path (with trailing and leading `/`) under which your blog will be available. A value of `/blog/` means that *miniPress* expects your blog posts to be available at `https://your-host.tld/$build.base/blog/$post`.
- `comparePosts`: A function which compares two posts. This is used to sort your posts. The default `comparePosts`-function orderes your posts by date.

### excerpt
`@minipress/plugin-excerpt` extracts excerpts and makes them available as components that can be rendered everywhere.

::: tip
`@minipress/plugin-excerpt` is usually only used indirectly because it is already preconfiguered once you are using `@minipress/plugin-blog`. In case you are curious or just want to use `@minipress/plugin-excerpt` directly read ahead.
:::

**Installation**
```sh
npm install @minipress/plugin-excerpt --save
```

**Configuration**
```js
module.exports = {
  plugins: [
    ['@minipress/plugin-excerpt']
  ]
}
```

**Usage**
With the **excerpt**-pluing installed you can now create excerpts like this:

```md {highlightLines: [5]}
# My Page

I am part of the excerpt.

<!-- more -->

The main content goes here.
```

Everything before `<!-- more -->` is considered part of the *excerpt* and everything after `<!-- more -->` is considered to be part of the main content.

The **excerpt**-pluing makes the excerpt available on the page-object. You can access the excerpt of the current page with
<code v-pre>{{ $minipress.page.excerpt }}</code>.

::: warn
Using <code v-pre>{{ $minipress.page.excerpt }}</code> on a page will output the rendered excerpt as text. If you want to display the rendered excerpt you should use the `Excerpt`-component.
:::

**The `Excerpt`-Component**
You can display the rendered excerpt of any page by using the `Excerpt`-component. This component is automatically installed by the **excerpt**-pluing. By default, `Excerpt` will render the excerpt of the current page. You can use the `ofPageWithKey`-prop to render the excerpt of any page:

```md
Rendered excerpt of page with *key* `plugins--excerpt-sample`:

<Excerpt ofPageWithKey="plugins--excerpt-sample" />
```

::: summary Show Rendered Excerpt
<Excerpt ofPageWithKey="plugins--excerpt-sample" />
:::

### clean-urls

**Installation**

```sh
npm install @minipress/plugin-clean-urls --save
```

**Configuration**
```js
module.exports = {
  plugins: [
    ['@minipress/plugin-clean-urls']
  ]
}
```

### additional-pages

**Installation**

```sh
npm install @minipress/plugin-additional-pages --save
```

**Configuration**

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

### head

**Installation**

```sh
npm install @minipress/plugin-head --save
```

**Configuration**

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

### package-json

**Installation**

```sh
npm install @minipress/plugin-package-json --save
```

**Configuration**

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


### last-modified
**Installation**

```sh
npm install @minipress/plugin-last-modified --save
```

**Configuration**

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


### custom-container
Custom containers can be very useful. The *docs*-theme comes with a few custom containers by default.

**Example**

::: tip
This is a custom container that is part of the *docs*-theme.
:::

The above container is the result of the following markdown markup:

```md
::: tip
This is a custom container that is part of the *docs*-theme.
:::
```

**Installation**

```sh
npm install @minipress/plugin-custom-container --save
```

**Configuration**

You define a custom container by specifying four things:

1. `type`: The type is basically just what you will end up writing in your markdown files in order to create a container. For example: If you set `type` to `tip` then

```md
::: tip
:::
```

will create an empty tip-container.

2. `defaultTitle`: A container can have a *title*. Everything that comes after `::: type` (in the same line) is *the title* of your container. In case no *title* is specified you can render a default title which is what you can specify with `defaultTitle`.
3. `renderBefore`: A function that should return a string that will be rendered before the actual container-content. You have access to the current title that is used.
4. `renderAfter`:  A function that should return a string that will be rendered after the actual container-content.

**Example**

```js
const TipContainer = {
  type: 'tip',
  defaultTitle: 'TIP',
  renderBefore: ({ title }) => `<div><p>${title}</p>\n`,
  renderAfter: () => '</div>\n'
}

module.exports = {
  plugins: [
    ['@minipress/plugin-custom-container', TipContainer]
  ]
}
```

::: tip
You can use `@minipress/plugin-custom-container` multiple times in order to create as many containers as you like.
:::

You can then use this custom container like this:

```md
::: tip My Title
You can even use *markdown*-syntax here.
:::
```


### component-documentation
The `@minipress/plugin-component-documentation` package allows you to easily render documentation for almost any of your custom Vue components. It does that by parsing your `*.vue`-files. Under the hood this plugin uses [Vuese](https://github.com/vue-contrib/vuese) to do that.

**Example**
```md {highlightLines:[1,7]}
::: component-documentation-for NameOfAnyGlobalComponent
You can add text here if you want.

It will be rendered right above the actual component documentation
but still inside the documentation-element (so that you can target
it with CSS selectors if you want).
:::
```

You can also refer to a component by path:

```md {highlightLines:[1,7]}
::: component-documentation-for @/sample-dir-structure/components/documented-component.vue
:::
```

::: component-documentation-for @/sample-dir-structure/components/documented-component.vue
:::

<details>
<summary>Show Rendered API Documentation</summary>

::: component-documentation-for @/sample-dir-structure/components/documented-component.vue
:::

</details>

::: tip
The example above makes use of `@/` which is replaced by whatever you have set for `cwd` in your configuration. It defaults to `process.cwd()`.
:::

**Installation**

```sh
npm install @minipress/plugin-component-documentation --save
```

**Configuration**

```js
module.exports = {
  plugins: [
    ['@minipress/plugin-component-documentation']
  ]
}
```

You can also specify a different renderer:

```js
module.exports = {
  plugins: [
    ['@minipress/plugin-component-documentation', { renderer: 'vuese-markdown' }]
  ]
}
```

By default the renderer used is called `minipress-markdown`. There are a couple of differences between `vuese-markdown` and `minipress-markdown`:

- ***minipress-markdown* supports markdown:** You can use any markdown feature inside your (multiline) comments.
- ***minipress-markdown* is styleable:** The *miniPress* renderer adds additional CSS classes to whatever it renders so that you can target the rendered output with your custom styles.
- ***minipress-markdown* does not use h-tags:** The *miniPress* also does not use any `<h>`-tags (e.g.: `<h1>`, …). This can be good or bad. It is bad because then your documentation does not show up in the table of contents. The advantage is that it also does not mess with your table of contents.

### summary-container
You can use `@minipress/plugin-summary-container` to render a nice summary + details element. You can use it for many things like displaying code samples or to embed advanced information that should be not shown by default. This is how a summary container can look like:

::: summary This is a summary. Click me! 😉

Congratulations! 🥳 You made it. This is what is referred to as the *details* of the *summary container*. You can add have any content here. You can use any markdown feature. You can also display code samples here:

```js
const x = 'hello world'
console.log(x)
```

Isn't that sweet?
:::

You can create a summary container like this:


````markdown
::: summary This is a summary. Click me! 😉
Congratulations! 🥳 Your actual content **goes** here.
:::
````

**Installation**

```sh
npm install @minipress/plugin-summary-container --save
```

**Configuration**

```js
module.exports = {
  plugins: [
    ['@minipress/plugin-summary-container']
  ]
}
```


### plugin-deploy-to-gh-pages

**Installation**

```sh
npm install @minipress/plugin-deploy-to-gh-pages --save-dev
```

**Configuration**

```js {highlightLines: [3]}
module.exports = {
  plugins: [
    ['@minipress/plugin-deploy-to-gh-pages']
  ]
}
```

**Usage**

`@minipress/plugin-deploy-to-gh-pages` adds a new command to the CLI. The command is called `deploy-to-gh-pages`. In order to deploy your site to GitHub Pages, just execute this command.

**package.json:**

```json {highlightLines: [3]}
{
  "scripts": {
    "deploy": "minipress deploy-to-gh-pages"
  }
}
```

**Options**

`@minipress/plugin-deploy-to-gh-pages` can be configured in case the defaults don't work for you.

- `skipGenerate` – default: `false`: By default `@minipress/plugin-deploy-to-gh-pages` will generate a static build of your site and then deploy it. If you want to skip the generation process set `skipGenerate` to `true`.
- `ghpagesOptions`: Under the hood `@minipress/plugin-deploy-to-gh-pages` uses the [gh-pages](https://github.com/tschaub/gh-pages)-package to do the heavy lifting. [gh-pages](https://github.com/tschaub/gh-pages) can be configured by setting certain options. Whatever you specify in `ghpagesOptions` will be passed as is to [gh-pages](https://github.com/tschaub/gh-pages).

### serve-static
This plugin allows you to add static assets to your site.

**Installation**

```sh
npm install @minipress/plugin-serve-static --save
```

**Configuration**

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

**Options**

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

### component-demo
The `@minipress/plugin-component-demo`-plugin allows you to render *live* demos of your components. This plugin also makes it easy to display the code for your demos.

**Installation**

```sh
npm install @minipress/plugin-component-demo --save
```

**Configuration**

```js
module.exports = {
  plugis: ['@minipress/plugin-component-demo']
}
```

A story is simply a `*.vue`-file which demos one of your components. By default every `*.vue`-file inside `cwd/.stories` will be made available automatically.

#### Writing a Demo

Simply create a `*.vue`-file (somewhere) inside the `.demos`-directory:

**.demos/my-fancy-component/default.vue**

```markup
<template>
  <div>
    <MyFancyComponent propA="test" />
  </div>
</template>
```

Now you can use the `Demo`-component to render the demo:

```md
## My Fancy Component Demo

<Demo name="MyFancyComponent-Default" />
```

`Demo` will render something like this:

<Demo name="MyFancyComponent-Default" />




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
  },
  logo: 'my Logo Text'
}

module.exports = {
  plugins: [
    ['@minipress/theme-docs', ThemeOptions]
  ]
}
```

#### Additional Features
`@minipress/theme-docs` also comes with a couple of additional features.

##### Containers
There are three custom containers you can choose from:

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

##### Layouts
The *docs*-theme also comes with a second layout: `hero`. You can see this layout in action by going to the [landing page](/).

It also includes two useful components:

- `MiniFlex`: Can be used to render a flex box.
- `MiniFlexItem`: Use this component inside `MiniFlex` to add content to your flex box.

##### Sidebar
You can control the visibility of the sidebar either by setting the layout:
- Layout `hero`: Does __not__ render a sidebar
- Layout `default`: Does render a sidebar

The sidebar can also be controlled by using frontmatter:

```md {highlightLines: [2]}
---
sidebar: false
---

# My Page
```

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

#### `configureRequestServer`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `server`: The HTTP server instance.

Called in order to configure a server instance that will serve *miniPress*.

#### `getHead`
- Hook Type: `AsyncSeriesHook`
- Arguments:
  - `head`: An instance of `@minipress/head-element`.
  - `page`: A page object.
  - `minipress`: The *miniPress*-instance

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
