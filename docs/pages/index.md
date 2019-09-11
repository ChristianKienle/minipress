# Welcome to *miniPress*

*miniPress* is a _minimalistic_ Vue-powered static site generator.

The main motivation for the development of *miniPress* was to get a better understanding of Vue + SSR + Webpack and all other related technologies. VuePress and Nuxt sometimes look like like magic: Things just work and you don't know why or how. This is not a bad thing – to the contrary. This makes those tools amazing and jaw dropping. They work really and come with a lot of features and a whole ecosystem. They even have a well tought out plugin API. Thus they should be used for any serious project.

However, if you just want to know how a tool like VuePress works it might be a good idea to take a closer look at *miniPress*.

*miniPress* is a very simple and minimalistic implementation of a subset of VuePress.

> If you don't intend to look at the code of *miniPress* it might be a good idea to not look at *miniPress* at all.

## *miniPress* in 5 Minutes *(or less)*

``` sh
npm install @minipress/minipress --global
echo "# Hello World" >> index.md
minipress dev
```

You should no be able to see your *miniPress* site by opening [http://localhost:4000](http://localhost:4000) in your browser and see the contents of `index.md` there.
