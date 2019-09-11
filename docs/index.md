# Welcome to *MinPress*

*MinPress* is a _minimalistic_ Vue-powered static site generator.

The main motivation for the development of *MinPress* was to get a better understanding of Vue + SSR + Webpack and all other related technologies. VuePress and Nuxt sometimes look like like magic: Things just work and you don't know why or how. This is not a bad thing – to the contrary. This makes those tools amazing and jaw dropping. They work really and come with a lot of features and a whole ecosystem. They even have a well tought out plugin API. Thus they should be used for any serious project.

However, if you just want to know how a tool like VuePress works it might be a good idea to take a closer look at *MinPress*.

*MinPress* is a very simple and minimalistic implementation of a subset of VuePress.

> If you don't intend to look at the code of *MinPress* it might be a good idea to not look at *MinPress* at all.

## *MinPress* in 5 Minutes *(or less)*

``` sh
npm install @minpress/minpress --global
echo "# Hello World" >> index.md
minpress dev
```

You should no be able to see your *MinPress* site by opening [http://localhost:4000](http://localhost:4000) in your browser and see the contents of `index.md` there.
