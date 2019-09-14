# Guide
*miniPress* is for the little ones – for everyone who is still trying to learn.

> *miniPress* is a _mini_-mal static site generator. It was created for educational purposes. Sometimes having something small and minimal (and probably incomplete) helps to get the big picture.

## Motivation & Purpose
The main motivation for the development of *miniPress* was to get a better understanding of Vue + SSR + Webpack and all other related technologies. VuePress and Nuxt sometimes look like like magic: Things just work and you don't know why or how. This is not a bad thing – to the contrary. This makes those tools amazing and jaw dropping. They work really and come with a lot of features and a whole ecosystem. They even have a well tought out plugin API. Thus they should be used for any serious project.

However, if you just want to know how a tool like VuePress works it might be a good idea to take a closer look at *miniPress*.

*miniPress* is a very simple and minimalistic implementation of a subset of VuePress.

> If you don't intend to look at the code of *miniPress* it might be a good idea to not look at *miniPress* at all.

## Quickstart

``` sh
npm install @minipress/minipress --global
mkdir pages
echo "# Hello World" >> pages/index.md
minipress dev
```

You should no be able to see your *miniPress* site by opening [http://localhost:4000](http://localhost:4000) in your browser and see the contents of `index.md` there.

*miniPress* follows the *convention over configuration paradigm* and thus a lot of defaults apply simply by executing `minipress dev`:

- All markdown files in `pages/` are served as pages – the path is inferred from their physical path on disk.
- All components in `components/` can be used in any markdown file.
- Custom layouts can be put inside `layouts/`.
- The default theme is used.

Head over to the [configuration guide](./configuration.md) in order to learn more details.

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