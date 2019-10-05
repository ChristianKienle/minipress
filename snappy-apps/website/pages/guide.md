# Guide
*Snappy Apps* is for everyone who wants to quickly build high performance, scaleable and Fiori compliant apps.


::: info
The *Snappy Apps Platform* allows you to build stunning, scaleable and Fiori-compliant Apps. It comes with a command line interface that gets you started in less than five minutes.
:::

## Quickstart

<MiniContent pageKey="quickstart" />

::: warn
Snappy Apps is still in beta. Things might break.
:::

You should no be able to see your *Snappy Apps* site by opening [http://localhost:4000](http://localhost:4000) in your browser and see the contents of `index.md` there.

*Snappy Apps* follows the *convention over configuration paradigm* and thus a lot of defaults apply simply by executing `minipress dev`:

- All markdown files in `pages/` are served as pages – the path is inferred from their physical path on disk.
- All components in `components/` can be used in any markdown file.
- Custom layouts can be put inside `layouts/`.
- The default theme is used.

Head over to the [configuration guide](./configuration.md) in order to learn more details.

## Built-In Components
*Snappy Apps* comes with a few components that are globally registered. This means you can just use them without any additional setup.

### `MiniContent`
`MiniContent` allows you to embed pages in other pages. You can use this for a lot of things. Here are a couple of use-cases to give you an idea:

- **Don't repeat yourself:** Imagine you have some kind of warning message that you want to display on multiple pages. Instead of copy and pasting the warning message every time you need it you save it in a regular Markdown file and then embed it where you need it by using `MiniContent`.
- **Use Markdown Features in `*.vue`-files:** It is not that easy to use Markdown features within `*.vue`-files. Imagine you want to create a page that needs to use certain Vue-features. Great. You create a page using the `vue`-file format. But now you can't use Markdown features like syntax highlighting, containers, etc. This is where `MiniContent` comes in. Simply store your Markdown content inside a `*.md`-file and embed it using `MiniContent`.

#### Usage
Let's embed a warning message in other pages. Create a file called `_warning-message.md`:

```md {highlightLines:[2]}
---
key: warning-message
---

> **WARNING**
> This App is still beta. Things might break.
```

Now you can embed this warning message everywhere like this:


```md {highlightLines:[3]}
Go ahead and try our super cool new App!

<MiniContent pageKey="warning-message" />
```

#### API
- **Props:**
  - `pageKey` – string

### `MiniLink`
A component that renders a `<router-link>` but comes with [Vue Router Prefetch](https://github.com/egoist/vue-router-prefetch)-integration.

### `MiniLayout`
A component that renders a registered layout given it's name.

#### Usage
```markup
<template>
  <div>
    <div>Before my Layout</div>
      <MiniLayout name="default">
        My Content goes here
      </MiniLayout>
    <div>After my Layout</div>
  </div>
</template>
```

## Global Computed: `$minipress`
By default, *Snappy Apps* installs a property called `$minipress` on every Vue instance. This provides you with a lot of interesting meta data about your *Snappy Apps* site (pages, heading, …). You also get access to some convenience methods.

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

```ts
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

*Snappy Apps* comes with a CLI. The CLI is part of the `@minipress/minipress` package and thus is installed by default.

```
minipress --help

Usage:
  $ minipress <command> [options]

Commands:
  dev       runs Snappy Apps in dev mode in the current directory
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