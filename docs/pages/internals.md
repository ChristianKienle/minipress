# Internals

If you want to know how *miniPress* works internally – this guide is for you.

> **A word of caution:**
> The internals change very frequently as I learn new things. Also – my understanding might be incorrect.

## How Pages come to Life
Let's assume that there is a directory called `pages/`, which contains all of your Markdown files. Each file represents a page. When *miniPress* is started, it looks in that directory and finds all Markdown files. It makes a note of each file and basically just renders the Markdown file using it's custom Markdown setup. So basically this is what happens (*pseudocode*):

``` js
const paths = findPagesIn('pages/')
paths.forEach(path => new Page(path).render())
```

The Markdown pipeline is setup in a **special way**:

* `render()` does some preprocessing (extract frontmatter, …) and the renders the page by basically invoking each Markdown(-it)-plugin.
* Each Markdown plugin knows which `Page`-instance it operates on.
* Each Markdown plugin does it's job and then simply sets properties on the page instance as needed.
* For example – the headings plugin sets the `headings`-property on the page instance.

After the *initial* render process the `Page`-instances are pre-populated with all the data we need.


## Learnings

### Plugin/Theme-API
Originally I wanted to have a plugin-/theme-API like plugins in Rollup are done:

**Custom Theme:**

```js
module.exports = {
  /* my theme implementation goes here */
}
```

**Theme Consumer:**

```js
const CustomTheme = require('my-custom-theme')

module.exports = {
  theme: CustomTheme
}
```

However, this has one big disadvantage: *miniPress* no longer knows the location of `CustomTheme` in the file system. This means that it cannot apply certain conventions for example automatically registering components found in `components/`. Probably that is why *VuePress* requires you to specify plugins by name. It is also possible to pass *VuePress* a function as a plugin but I have no idea how they do it.

## asyncData

Two things:

1. First, I will describe how nuxt supports `asyncData` and then
2. I will describe how it works in miniPress

Let's assume you have a page that looks like this:

``` markup
<template>
  <div>{{firstname}} – {{lastname}}</div>
</template>

<script>
import fetchLastName from './fetch-last-name'
export default {
  data: () => ({firstName: ''}),
  asyncData() {
    // < returns a promise that resolves to:
    // { lastName: 'Borg' } (or some other last name)
    return fetchLastName()
  }
}
</script>
```

Now the user navigates to this page. Then `asyncData` is called on the server side and not again on the client. `asyncData` is called on the client for every page visited after the first one. The intention is probably to have a fast first page load and then the client takes over the control of `asyncData` for all subsequent site naviations.

Note: Executing `nuxt generate` causes `asyncData` to be executed for each page (that does not have a dynamic route). Each `asyncData` is made part of the corresponding page bundle. But this bundled `asyncData` is only used for the initial page load (even for statically built sites). This may be what I want – or it may not be what I want. Where it breaks down is in cases where `asyncData` truly returns "static" data.

This is how `asyncData` looks in miniPress:


``` markup
<template>
  <div>{{firstname}} – {{lastname}}</div>
</template>
<script>
import fetchLastName from './fetch-last-name'

export default {
  data: () => ({firstName: ''}),
  asyncData(asyncDataSSR) {
    if(asyncDataSSR.lastName != null) {
      return asyncDataSSR
    }
    return fetchLastName()
  }
}
</script>
```

*miniPress* calls `asyncData` twice. ALWAYS. Once on the server and the again on the client. The `asyncDataSSR` argument contains a copy of what has been generated during SSR. This can be `{}` in case `asyncData` is currently executed on the server. In other cases it is just whatever `asyncData` returned during SSR. This allows you to check the contents of `asyncDataSSR`. In the case above I check whether or not it contains a `lastName`. If it does `asyncDataSSR` is good enough for my use case and I simply return `asyncDataSSR`. If it does not contain `lastName` I am fetching the last name from the backend.

- During Development miniPress initially sets `asyncDataSSR` to `{}` (when not disabled with `--keep-cache`) for every page. `asyncData` is called lazily – once you visit the corresponding page.
- When building a static version of the site `asyncData` is invoked for each page and also bundled with each page so that subsequent invokations come with the `asyncDataSSR` argument.
