# Features

## Writing Pages
*miniPress* allows you to write pages either as Single File Components (`*.vue`) or as Markdown documents. It is recommended to write your pages primarily in Markdown.

### Markdown
By default – *miniPress* comes with several features which make writing pages in Markdown really convenient.

#### Displaying Code
You can use three backticks ` ``` ` in order to display a block of code.

##### Syntax Highlighting
If you append a language code (e.g.: ` ```js `) it will be used to highlight the code block. Code is highlighted by using [Prism](https://prismjs.com/).

````markdown
```js
export default message => {
  if(message == null) {
    console.error('message is required')
    return
  }
  console.log(`message is ${message}`)
}
```
````

Renders as:

````js
export default message => {
  if(message == null) {
    console.error('message is required')
    return
  }
  console.log(`message is ${message}`)
}
````

##### Highlight Lines
If you want to highlight specific lines you can do so:

````markdown
```js {highlightLines:['2-3']}
export default message => {
  if(message == null) {
    console.error('message is required')
    return
  }
  console.log(`message is ${message}`)
}
```
````

Renders as:

```js { highlightLines:['2-3'] }
export default message => {
  if(message == null) {
    console.error('message is required')
    return
  }
  console.log(`message is ${message}`)
}
```

### As Single File Components
If you want to write a page as a Vue Single File Component it works like this:

**pages/my-page.vue**
```markup
<template>
  <div>
    You Content goes here!
  </div>
</template>
```

You can specify a custom layout like this:

**pages/my-page.vue**

```markup {highlightLines:[7,8]}
<template>
  <div>
    You Content goes here!
  </div>
</template>
<script>
export default {
  layout: 'custom'
}
</script>
```
