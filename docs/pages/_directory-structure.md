
## Directory Structure

Another way to configure/customize *miniPress* is to take advantage of certain conventions.

For example, every `*.vue`-file you add inside a directory called `components` will be globally registered.

There is a lot more to discover – so let's go.

```{highlightLines:[2,7,10,16]}
.
├── components
│   ├── table
│   │   ├── index.vue
│   │   └── row.vue
│   └── my-button.vue
├── layouts
│   ├── default.vue
│   └── fullscreen.vue
├── pages
│   ├── about
│   │   ├── contact.md
│   │   ├── index.md
│   │   └── jobs.md
│   └── index.md
├── minipress.config.js
└── package.json
```

### components/
Any `*.vue` file placed in the components directory will be registered globally. You can create more directories inside the `components`-directory. Global components can be used in your pages and in other `*.vue`-files. The sample directory structure shown above contains three component files: `table/index.vue`, `table/row.vue` and `my-button.vue`. *miniPress* will register these components under the following name:

- `my-button.vue` will be named `MyButton`
- `table/index.vue` will be named `Table-Index`
- `table/row.vue` will be named `Table-Row`

### layouts/
Any `*vue` file placed in this directory are registered as layout components. The example `layouts`-directory above contains two layouts. When a page is rendered the `default`-layout will be used. Use frontmatter to override this:

```md{highlightLines:[2]}
---
layout: fullscreen
---

# My Fullscreen Page
```

### pages/
Put markdown (`*.md`) and Vue (`*.vue`) files in this directory in order to provide actual content for your site.
