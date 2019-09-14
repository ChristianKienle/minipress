# Features

## Markdown

### Displaying Code

You can use three backticks ` ``` ` in order to display a block of code.

#### Syntax Highlighting

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

#### Highlight Lines

If you want to highlight specific lines you can do so:


````markdown
```js {highlightLines:[2,4]}
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


```js {highlightLines:[2,4]}
export default message => {
  if(message == null) {
    console.error('message is required')
    return
  }
  console.log(`message is ${message}`)
}
```

