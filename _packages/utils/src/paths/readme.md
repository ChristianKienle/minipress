# Huston we have a problem:

## `$page.relativePath`
Each $page has a relativePath – e.g.:

````
$page.relativePath = themes/default.md
````

This is used to determine two things:

1. The path for the page's url:
  * `localhost/themes/default.html` or
  * `localhost/themes/default` (clean urls)
2. The file name of the page used when generating a production build
  * `./themes/default.html` or
  * `./themes/default/index.html` (clean urls)

## Processing Links in Markdown Files

Assume there is a Markdown file with the following contents:

**File:** */themes/clean.md*

``` md
# Clean

- [All Themes](./index.md)
- [Dirty Theme](./dirty.md)
```

When we process such a link we have to transform this (relative or absolute) path to a physical page file to an absolute url path.

For this we have to know two things:

1. Which page are we on and thus what is it's relativePath?
2. How to compute the absolute path (taking `cleanUrls=true|false` into account)
