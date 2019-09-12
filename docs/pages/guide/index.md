# Guide
*miniPress* is for the little ones – for everyone who is still trying to learn.

> *miniPress* is a _mini_-mal static site generator. It was created for educational purposes. Sometimes having something small and minimal (and probably incomplete) helps to get the big picture.

## Configuration

If you run `minipress dev` without any additional arguments the following configuration is used automatically:

| Setting        | Description           | Default Value  |
| ------------- |:-------------| :-----|
| `cwd` | current working directory | `process.cwd()` |
| `pages` | directory that contains pages to be served | `$cwd` |
| `dest` | where to put the production build | `$cwd/.minipress/dist` |
| `tempDir` | where to put temporary items | `$cwd/.minipress/.temp` |
| `navbar` | Navbar configuration | `{ items: [] }` |
| `layouts` | custom layouts | `{}` |
| `components` | directory with SFCs which will be registered globally | `$cwd/components` |

> `$something` stands for the value of the corresponding setting. For example `$cwd` stands for either the default value of `cwd` or the value that has been set in the configuration.

This means that executing

``` bash
minipress dev
```

will serve all Markdown files (`*/**/*.md`) in the current directoy as pages on `localhost`. No navigation bar will be displayed.

## Layouts

### Writing a Layout

## Theme

### Writing a Theme

A theme is nothing special. It is simply a CommonJS Module that follows certain conventions. To be more precise: A theme is a CommonJS Module that exports a function which takes a *theme configuration* and returns a fully configured theme.

``` js
const { join } = require('path')
module.exports = themeConfig => ({
  layouts: join(__dirname, 'layouts')
})
```

The `themeConfig`

This theme provides layouts located in it's `layouts`-directory. A custom layout is simply a `.vue`-file which looks like this:

``` markup
<template>
  <div>
    <slot />
  </div>
</template>
```

## Built-In Components

### `OutoundLink`

### `Link`

### `Layout`


### `LayoutManager`

## Global Computed: `$minipress`
By default, *miniPress* installs a property called `$minipress` on every Vue instance. This provides you with a lot of interesting meta data about your *miniPress* site (pages, heading, …). You also get access to some convenience methods.

`$minipress` exposes certain properties and methods which you can access from almost everywhere. You can access `$minipress` from

- any JavaScript file by using `this.$minipress.property_or_method`,
- any Vue `<template>`-section by using `$minipress.property_or_method` and
- any Markdown file by using <code v-pre>{{ $minipress.property_or_method }}</code>.

Replace `property_or_method` by any of the documented properties/methods (see below).

### Properties

#### `site`
Give you access to the site meta data.

> `site` also exposes `themeConfig`

#### `themeConfig`
Contains the theme configuration (as set via `.minipress/config.js`).

#### `page`

Gives you access to the currently displayed page.

##### `page.frontmatter`

Gives you access to the parsed front matter object. The object simply contains keys and values.

##### `page.headings`

Contains the headings found on the current page. The value will always be an array with one or more heading-objects inside.

A heading object has the following shape:

``` typescript
type Heading = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  // name of the anchor (without the #)
  slug: string;
  // heading text
  text: string;
}
```

##### `page.key`

Contains a key uniquely identifying the corresponding page.

##### `page.layout`

Contains the name of the layout used to display this page.

### Methods

#### pageForKey(key)

Use `$minipress.pageForKey(key)` in order to get the `Page`-object for a given key.

* **Arguments:**
  * `key: string`: The key of a page.

#### pageLink(to)

Use `$minipress.pageLink(to)` in order to get an absolute path for a given relative path. `to` should be the path to a page as it appears in your file system. For example,

``` js
$minipress.pageLink('./themes/clean.md')
```

basically returns the value for the `href`-attribute.

* **Arguments:**
  * `to: string`: Relative path to a page as it is present in your file system.

## CLI

*miniPress* comes with a CLI. The CLI is part of the `@minipress/minipress` package and thus is installed by default.

```
minipress --help

Usage:
  $ minipress <command> [options]

Commands:
  dev       runs miniPress in dev mode in the current directory
  generate  generates a static version of your site
  serve     serves a static version of your site

For more info, run any command with the `--help` flag:
  $ minipress dev --help
  $ minipress generate --help
  $ minipress serve --help

Options:
  --config <file>  spefify config (default: /Users/d069408/ChristianKienle/minpress/docs/.minipress/config.js)
  --mode <mode>    spefify mode (default: development)
  -h, --help       Display this message
```