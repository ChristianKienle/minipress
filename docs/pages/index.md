---
layout: hero
---

<mp-flex>
<mp-flex-item><mp-hero-logo :width="150" /></mp-flex-item>
<mp-flex-item>
<h1><em>miniPress</em></h1>
<p><em>A minimalistic static site generator</em></p>
<div style="margin-top:2rem;">
<mp-button to="/guide/">Get Started</mp-button>
<mp-button style="margin-left:1rem;" secondary to="/guide/">GitHub</mp-button>
</div>
</mp-flex-item>
</mp-flex>

## Quickstart

``` sh
$ npm install @minipress/minipress --global
$ echo "# Hello World" >> index.md
$ minipress dev

  ✔ index.md added
  ℹ minipress is running on http://0.0.0.0:4000
```

sss