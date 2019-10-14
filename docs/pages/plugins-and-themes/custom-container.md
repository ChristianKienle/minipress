
# custom-container
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

## Installation
```sh
npm install @minipress/plugin-custom-container --save
```

## Configuration
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