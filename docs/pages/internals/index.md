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






