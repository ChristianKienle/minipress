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

### `LayoutManager`

## Globally available Properties
By default, *miniPress* installs a *Vue mixin*. This mixin gives you access to a lot of interesting meta data about pages (…). You also get access to some convenience methods.

The mixin exposes certain properties and methods which you can access from almost everywhere. You can access those methods and properties from

- any JavaScript file by using `this.$propertyName`,
- any Vue `<template>`-section by using `$propertyName` and
- any Markdown file by using <code v-pre>{{ $propertyName }}</code>.

Replace `$propertyName` by any of the documented properties/methods (see below).

### `$site`
Give you access to the site meta data.

#### `$site.themeConfig`
Contains the theme configuration (as set via `.minipress/config.js`).

### `$page`

Gives you access to the currently displayed page.

#### `$page.frontmatter`

Gives you access to the parsed front matter object. The object simply contains keys and values.

#### `$page.headings`

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

#### `$page.key`

Contains a key uniquely identifying the corresponding page.

#### `$page.layout`

Contains the name of the layout used to display this page.
