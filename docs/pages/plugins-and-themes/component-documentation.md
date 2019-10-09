
# component-documentation
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
::: component-documentation-for @/sample-dir-structure/components/my-button.vue
:::
```

<details>
<summary>Show Rendered API Documentation</summary>

::: component-documentation-for @/sample-dir-structure/components/my-button.vue
:::

</details>

::: tip
The example above makes use of `@/` which is replaced by whatever you have set for `cwd` in your configuration. It defaults to `process.cwd()`.
:::

## Installation
```sh
npm install @minipress/plugin-component-documentation --save
```

## Configuration

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
