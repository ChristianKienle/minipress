# summary-container
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

## Installation
```sh
npm install @minipress/plugin-summary-container --save
```

## Configuration
```js
module.exports = {
  plugins: [
    ['@minipress/plugin-summary-container']
  ]
}
```
