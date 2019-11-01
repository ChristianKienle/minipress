---
title: miniPress v0.8.0 Released
sidebar: false
date: 2019-11-01
layout: post
---

As of today, *miniPress* v0.8.0 is available. This release has a lot of bug fixes and two new features:

- Blog Plugin: This plugin allows you to easily build your own blog. Isn't that cool?
- Excerpts: Easily create and render excerpts.

By the way: This is the first ever post published using the new **blog**-plugin. 😱

<!-- more -->

The **blog**-plugin is super easy to use:

**Installation**

```sh
npm install @minipress/plugin-blog --save
```

Now add it in your `minipress.config.js`-file:

```js
module.exports = {
  plugins: ['@minipress/plugin-blog']
}
```

Write your first post:

`.posts/first-post.md`


```md
---
title: Hello World
---

Hello Blog!

<!-- more -->

I am the **actual** content of the post.
Using the `more`-comment is optional.
```

It is up to you to render a list of your posts. The **blog**-plugin gives you access to the posts via `$minipress.site.posts`.
