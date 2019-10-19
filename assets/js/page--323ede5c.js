(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{137:function(e,t,a){"use strict";a.r(t);var s=a(0),n=function(e){var t=e.options.beforeCreate||[];e.options.beforeCreate=[function(){var e,t,a={file:{relative:"plugins-and-themes/index.md"},content:"",contentType:"md",headings:[{text:"Plugins & Themes",slug:"plugins-amp-themes",level:1},{text:"Available Plugins",slug:"available-plugins",level:2},{text:"Avaiable Themes",slug:"avaiable-themes",level:2},{text:"@minipress/theme-default",slug:"minipresstheme-default",level:3},{text:"@minipress/theme-docs",slug:"minipresstheme-docs",level:3},{text:"Installation",slug:"installation",level:4},{text:"Usage",slug:"usage",level:4},{text:"Options",slug:"options",level:4},{text:e="navbar",slug:e,level:5},{text:"Additional Features",slug:"additional-features",level:4},{text:"Writing a Plugin or Theme",slug:"writing-a-plugin-or-theme",level:2},{text:"Hooks",slug:"hooks",level:3},{text:"beforeRun",slug:"beforerun",level:4},{text:"chainWebpack",slug:"chainwebpack",level:4},{text:"getWebpackConfig",slug:"getwebpackconfig",level:4},{text:"getHead",slug:"gethead",level:4},{text:"configureSiteData",slug:"configuresitedata",level:4},{text:"emitSiteData",slug:"emitsitedata",level:4},{text:"emitPages",slug:"emitpages",level:4},{text:"emitRoutes",slug:"emitroutes",level:4},{text:"minipress-Instance API",slug:"minipress-instance-api",level:2},{text:"registerComponent(id, path)",slug:"registercomponentid-path",level:3},{text:"registerLayout(id, path)",slug:"registerlayoutid-path",level:3},{text:"registerAlias(name, path)",slug:"registeraliasname-path",level:3},{text:"registerDynamicModule(name, path)",slug:"registerdynamicmodulename-path",level:3},{text:"addAppEnhancer(code)",slug:"addappenhancercode",level:3},{text:"joi",slug:"joi",level:3},{text:"addPage(page)",slug:"addpagepage",level:3},{text:"removePage(key)",slug:"removepagekey",level:3},{text:"removePageWhere(condition)",slug:"removepagewherecondition",level:3}],regularPath:t="/plugins-and-themes/",key:"323ede5c",frontmatter:{},attributes:{},layout:void 0,path:t};this.$page=a}].concat(t)},i=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("MiniLayout",{attrs:{name:"default"}},[a("div",{staticClass:"page-content"},[a("h1",{attrs:{id:"plugins-amp-themes"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#plugins-amp-themes","aria-hidden":"true"}},[e._v("#")]),e._v(" Plugins & Themes")],1),e._v(" "),a("p",[e._v("For "),a("em",[e._v("miniPress")]),e._v(" plugins and themes are the same thing. There is virtually no difference between a theme and a plugin. However, the term "),a("em",[e._v("plugin")]),e._v(" is more technical than the term "),a("em",[e._v("theme")]),e._v(". Everyone knows what a theme does: It changes the look and feel of your site. When I say "),a("em",[e._v("“hey look at this cool plugin I made”")]),e._v(" you don’t know a thing about what to expect.")]),e._v(" "),a("p",[e._v("That is why within this documentation we still differentiate between "),a("em",[e._v("plugins")]),e._v(" and "),a("em",[e._v("themes")]),e._v(" – but only for educational purposes.")]),e._v(" "),a("MiniInfo",[a("p",[e._v("From a technical point of view plugins and themes are identical.")])]),e._v(" "),a("h2",{attrs:{id:"available-plugins"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#available-plugins","aria-hidden":"true"}},[e._v("#")]),e._v(" Available Plugins")],1),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Plugin")]),e._v(" "),a("th",{staticStyle:{"text-align":"left"}},[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/clean-urls.md")}},[e._v("Clean URLs")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Creates clean URLs with "),a("em",[e._v("zero")]),e._v(" configuration.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/additional-pages.md")}},[e._v("Additional Pages")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Add more pages that can be "),a("em",[e._v("anywhere")]),e._v(" or "),a("em",[e._v("anything")]),e._v(".")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/head.md")}},[e._v("Head")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Take control over everything between "),a("code",[e._v("<head>")]),e._v(" and "),a("code",[e._v("</head>")]),e._v(".")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/package-json.md")}},[e._v("package.json")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Makes your "),a("code",[e._v("package.json")]),e._v(" available to your pages.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/last-modified.md")}},[e._v("Last Modified")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Adds a last modified date to your pages.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/custom-container.md")}},[e._v("Custom Container")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Add custom Markdown containers.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/component-documentation.md")}},[e._v("Component Documentation")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Automatically generates and renders documentation for your own components.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/summary-container.md")}},[e._v("Summary Container")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("A custom markdown container that renders "),a("code",[e._v("<details>")]),e._v(" and "),a("code",[e._v("<summary>")]),e._v("-elements.")])]),e._v(" "),a("tr",[a("td",[a("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/deploy-to-gh-pages.md")}},[e._v("Deploy to GitHub Pages")])],1),e._v(" "),a("td",{staticStyle:{"text-align":"left"}},[e._v("Easily deploy to GitHub Pages.")])])])]),e._v(" "),a("h2",{attrs:{id:"avaiable-themes"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#avaiable-themes","aria-hidden":"true"}},[e._v("#")]),e._v(" Avaiable Themes")],1),e._v(" "),a("h3",{attrs:{id:"minipresstheme-default"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#minipresstheme-default","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("@minipress/theme-default")])],1),e._v(" "),a("p",[e._v("This is the default theme. It is used whenever no theme has been specified. It does not do much.")]),e._v(" "),a("h3",{attrs:{id:"minipresstheme-docs"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#minipresstheme-docs","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("@minipress/theme-docs")])],1),e._v(" "),a("p",[e._v("This is the theme that powers this very site.")]),e._v(" "),a("h4",{attrs:{id:"installation"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#installation","aria-hidden":"true"}},[e._v("#")]),e._v(" Installation")],1),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"sh"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-sh"}},[a("code",{pre:!0,attrs:{class:"language-sh"}},[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" @minipress/theme-docs --save")])])]),a("h4",{attrs:{id:"usage"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#usage","aria-hidden":"true"}},[e._v("#")]),e._v(" Usage")],1),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[e._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'@minipress/theme-docs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/* optional theme config */")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])])]),a("h4",{attrs:{id:"options"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#options","aria-hidden":"true"}},[e._v("#")]),e._v(" Options")],1),e._v(" "),a("p",[a("code",[e._v("@minipress/theme-docs")]),e._v(" has some useful options:")]),e._v(" "),a("h5",{attrs:{id:"navbar"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#navbar","aria-hidden":"true"}},[e._v("#")]),e._v(" navbar")],1),e._v(" "),a("p",[e._v("Customize the navigation bar displayed at the top.")]),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" ThemeOptions "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  navbar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    items"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Home'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Guide'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/guide/'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'About'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" link"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'/about/'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'@minipress/theme-docs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" ThemeOptions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])])]),a("h4",{attrs:{id:"additional-features"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#additional-features","aria-hidden":"true"}},[e._v("#")]),e._v(" Additional Features")],1),e._v(" "),a("p",[a("code",[e._v("@minipress/theme-docs")]),e._v(" also comes with a couple of additional features. There are three custom containers you can choose from:")]),e._v(" "),a("MiniTip",{attrs:{title:"TIP"}},[a("p",[e._v("Tips is a tip container.\nYou can use "),a("code",[e._v(":::tip")]),e._v(" to display almost any useful information.")])]),e._v(" "),a("MiniWarn",{attrs:{title:"WARNING"}},[a("p",[e._v("Tips is a warning container.\nUse "),a("code",[e._v(":::warn")]),e._v(" to display a warning. This is useful to help the user along to get non-obvious things right.")])]),e._v(" "),a("MiniError",{attrs:{title:"ERROR"}},[a("p",[e._v("Tips is an error container.\nUse "),a("code",[e._v(":::error")]),e._v(" to display error messages or highly important information.")])]),e._v(" "),a("p",[e._v("The "),a("em",[e._v("docs")]),e._v("-theme also comes with a second layout: "),a("code",[e._v("hero")]),e._v(". You can see this layout in action by going to the "),a("MiniLink",{attrs:{to:e.$minipress.pageLink("/")}},[e._v("landing page")]),e._v(".")],1),e._v(" "),a("p",[e._v("It also includes two useful components:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("MiniFlex")]),e._v(": Can be used to render a flex box.")]),e._v(" "),a("li",[a("code",[e._v("MiniFlexItem")]),e._v(": Use this component inside "),a("code",[e._v("MiniFlex")]),e._v(" to add content to your flex box.")])]),e._v(" "),a("h2",{attrs:{id:"writing-a-plugin-or-theme"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#writing-a-plugin-or-theme","aria-hidden":"true"}},[e._v("#")]),e._v(" Writing a Plugin or Theme")],1),e._v(" "),a("p",[e._v("A plugin is a normal NPM package. Its entry point ("),a("code",[e._v("main")]),e._v("-file) should export an "),a("code",[e._v("object")]),e._v(" with an "),a("code",[e._v("apply")]),e._v("-function. The "),a("code",[e._v("apply")]),e._v("-function will be called by "),a("em",[e._v("miniPress")]),e._v(" early on:")]),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[e._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("apply")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[e._v("minipress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" options")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// plugin implementation goes here")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])])]),a("p",[a("code",[e._v("apply")]),e._v(" has access to two things:")]),e._v(" "),a("ol",[a("li",[a("code",[e._v("minipress")]),e._v(": The "),a("em",[e._v("miniPress")]),e._v("-instance.")]),e._v(" "),a("li",[a("code",[e._v("options")]),e._v(": The plugin options passed to the plugin by the consumer. This can be "),a("code",[e._v("undefined")]),e._v(" in case no options have been specified. There is no fallback to "),a("code",[e._v("{}")]),e._v(".")])]),e._v(" "),a("p",[e._v("It is the duty of the plugin developer to do the right thing inside "),a("code",[e._v("apply")]),e._v(". You may use any public method on the "),a("code",[e._v("minipress")]),e._v("-instance in case you have special needs. The "),a("code",[e._v("minipress")]),e._v("-instance opens the door to a very poweful meachnism: "),a("strong",[e._v("hooks")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"hooks"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#hooks","aria-hidden":"true"}},[e._v("#")]),e._v(" Hooks")],1),e._v(" "),a("p",[e._v("You can use hooks to hook into almost every aspect of "),a("em",[e._v("miniPress")]),e._v(". Hooks are called by "),a("em",[e._v("miniPress")]),e._v(" – you only have to register for all the hooks you want and wait to be called. Just like at the doctors office. Sit still. Don’t say a word.")]),e._v(" "),a("h4",{attrs:{id:"beforerun"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#beforerun","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("beforeRun")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments: "),a("em",[e._v("none")])])]),e._v(" "),a("p",[e._v("This hook is called right at the start the "),a("code",[e._v("run(…)")]),e._v("–method. Almost every CLI-command will end up calling "),a("code",[e._v("run(…)")]),e._v(" at the start.")]),e._v(" "),a("h4",{attrs:{id:"chainwebpack"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#chainwebpack","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("chainWebpack")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments:\n"),a("ul",[a("li",[a("code",[e._v("chain")]),e._v(": An instance of "),a("a",{attrs:{href:"https://github.com/neutrinojs/webpack-chain",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack-chain.Config"),a("MpOutboundLink")],1)]),e._v(" "),a("li",[a("code",[e._v("type")]),e._v(": Either "),a("code",[e._v("server")]),e._v(" or "),a("code",[e._v("client")])])])])]),e._v(" "),a("p",[e._v("Called right before a webpack config is requested. This allows you to modify to webpack chain before it is used to create the actual config object.")]),e._v(" "),a("h4",{attrs:{id:"getwebpackconfig"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#getwebpackconfig","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("getWebpackConfig")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments:\n"),a("ul",[a("li",[a("code",[e._v("chain")]),e._v(": An instance of "),a("a",{attrs:{href:"https://github.com/neutrinojs/webpack-chain",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack-chain.Config"),a("MpOutboundLink")],1)]),e._v(" "),a("li",[a("code",[e._v("type")]),e._v(": Either "),a("code",[e._v("server")]),e._v(" or "),a("code",[e._v("client")])])])])]),e._v(" "),a("p",[e._v("Called in order to get a webpack configuration.")]),e._v(" "),a("h4",{attrs:{id:"gethead"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#gethead","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("getHead")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments:\n"),a("ul",[a("li",[a("code",[e._v("head")]),e._v(": An instance of "),a("code",[e._v("@minipress/head-element")]),e._v(".")]),e._v(" "),a("li",[a("code",[e._v("page")]),e._v(": A page object.")])])])]),e._v(" "),a("p",[e._v("Called during the render process (see "),a("code",[e._v("src/vue-renderer")]),e._v(" for details). This is called multiple times – at least once for each page. Every time a page is rendered – at some point we need to create the "),a("code",[e._v("<head>")]),e._v("-element. This hook allows you to modify the head of each page.")]),e._v(" "),a("h4",{attrs:{id:"configuresitedata"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#configuresitedata","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("configureSiteData")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments:\n"),a("ul",[a("li",[a("code",[e._v("siteData")]),e._v(": In the beginning this is just "),a("code",[e._v("{}")]),e._v(". Then each hook can mutate this object in order to add more site specfic data.")])])])]),e._v(" "),a("h4",{attrs:{id:"emitsitedata"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#emitsitedata","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("emitSiteData")])],1),e._v(" "),a("ul",[a("li",[e._v("Hook Type: "),a("code",[e._v("AsyncSeriesHook")])]),e._v(" "),a("li",[e._v("Arguments:\n"),a("ul",[a("li",[a("code",[e._v("siteData")]),e._v(": The site data (type "),a("code",[e._v("object")]),e._v(") that needs to be emitted.")])])])]),e._v(" "),a("h4",{attrs:{id:"emitpages"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#emitpages","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("emitPages")])],1),e._v(" "),a("h4",{attrs:{id:"emitroutes"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#emitroutes","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("emitRoutes")])],1),e._v(" "),a("h2",{attrs:{id:"minipress-instance-api"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#minipress-instance-api","aria-hidden":"true"}},[e._v("#")]),e._v(" "),a("code",[e._v("minipress")]),e._v("-Instance API")],1),e._v(" "),a("h3",{attrs:{id:"registercomponentid-path"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#registercomponentid-path","aria-hidden":"true"}},[e._v("#")]),e._v(" registerComponent(id, path)")],1),e._v(" "),a("p",[e._v("Call this method to register a Vue component globally.")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("id")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The name of the component to register.")])])]),e._v(" "),a("li",[a("code",[e._v("path")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The absolute path to the component to register.")])])])]),e._v(" "),a("h3",{attrs:{id:"registerlayoutid-path"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#registerlayoutid-path","aria-hidden":"true"}},[e._v("#")]),e._v(" registerLayout(id, path)")],1),e._v(" "),a("p",[e._v("Call this method to register a layout component.")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("id")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The name of the layout to register.")])])]),e._v(" "),a("li",[a("code",[e._v("path")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The absolute path to the layout component to register.")])])])]),e._v(" "),a("h3",{attrs:{id:"registeraliasname-path"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#registeraliasname-path","aria-hidden":"true"}},[e._v("#")]),e._v(" registerAlias(name, path)")],1),e._v(" "),a("p",[e._v("Call this method to register a "),a("a",{attrs:{href:"https://webpack.js.org/configuration/resolve/#resolvealias",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack alias"),a("MpOutboundLink")],1),e._v(".")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("name")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The name of the alias you want to register.")])])]),e._v(" "),a("li",[a("code",[e._v("path")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The absolute path to a file that should be used when resolving the alias.")])])])]),e._v(" "),a("h3",{attrs:{id:"registerdynamicmodulename-path"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#registerdynamicmodulename-path","aria-hidden":"true"}},[e._v("#")]),e._v(" registerDynamicModule(name, path)")],1),e._v(" "),a("p",[e._v("Call this method to register a dynamic module.")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("name")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The name of the dynamic module you want to register.")])])]),e._v(" "),a("li",[a("code",[e._v("code")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The raw code of the dynamic module.")])])])]),e._v(" "),a("p",[a("strong",[e._v("Example")]),e._v("\nRegister the module in your configuration file or in your plugin implementation:")]),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" code "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[e._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("\nexport default () => console.log('hi there 😌')\n")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[e._v("`")])]),e._v("\nminipress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("registerDynamicModule")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'sayHi'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" code"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")])])])]),a("p",[e._v("In any of your "),a("code",[e._v("*.vue")]),e._v("-files:")]),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("import")]),e._v(" SayHi "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("from")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'#minipress/dynamic/sayHi'")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("SayHi")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// → 'hi there 😌'")])])])]),a("h3",{attrs:{id:"addappenhancercode"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#addappenhancercode","aria-hidden":"true"}},[e._v("#")]),e._v(" addAppEnhancer(code)")],1),e._v(" "),a("p",[e._v("This method allows you to add an "),a("em",[e._v("app enhancer")]),e._v(".")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("code")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The raw code of the enhancer.")])])])]),e._v(" "),a("p",[e._v("An "),a("em",[e._v("app enhancer")]),e._v(" is similar to a "),a("em",[e._v("dynamic module")]),e._v(". The difference is that "),a("em",[e._v("app enhancers")]),e._v(" are automatically imported and called by "),a("em",[e._v("miniPress")]),e._v(" very early on. This allows you to access the "),a("code",[e._v("Vue")]),e._v("-constructor or do other things I can’t think of right now.")]),e._v(" "),a("p",[a("strong",[e._v("Example")])]),e._v(" "),a("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[a("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[a("code",{pre:!0,attrs:{class:"language-js"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" code "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[e._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("\nexport default ({ Vue }) => {\n  // Access the Vue-constructor here.\n  // e.g.: Vue.component(…) or Vue.use(…).\n}\n")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[e._v("`")])]),e._v("\nminipress"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("addAppEnhancer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("code"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")])])])]),a("MiniWarn",{attrs:{title:"WARNING"}},[a("p",[e._v("The default export of your "),a("em",[e._v("app enhancer")]),e._v(" must be a function. Otherwise things will not work.")])]),e._v(" "),a("p",[a("em",[e._v("miniPress")]),e._v(" will call the function you expose automatically as early as possible.")]),e._v(" "),a("h3",{attrs:{id:"joi"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#joi","aria-hidden":"true"}},[e._v("#")]),e._v(" joi")],1),e._v(" "),a("p",[e._v("This property returns the "),a("a",{attrs:{href:"https://hapi.dev/family/joi",target:"_blank",rel:"noopener noreferrer"}},[e._v("@hapi/joi"),a("MpOutboundLink")],1),e._v(" default export. "),a("em",[e._v("Joi")]),e._v(" is exposed on the "),a("em",[e._v("miniPress")]),e._v("-instance for convenience purposes only. You can use it to create new schemas.")]),e._v(" "),a("h3",{attrs:{id:"addpagepage"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#addpagepage","aria-hidden":"true"}},[e._v("#")]),e._v(" addPage(page)")],1),e._v(" "),a("p",[e._v("This method allows you to add a single page to "),a("em",[e._v("miniPress")]),e._v(".")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("page")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("Page")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The page which you want to add.")])])])]),e._v(" "),a("h3",{attrs:{id:"removepagekey"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#removepagekey","aria-hidden":"true"}},[e._v("#")]),e._v(" removePage(key)")],1),e._v(" "),a("p",[e._v("This method allows you to remove a single page from "),a("em",[e._v("miniPress")]),e._v(".")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("key")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("String")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" The key of the page you want to remove.")])])])]),e._v(" "),a("h3",{attrs:{id:"removepagewherecondition"}},[a("router-link",{staticClass:"header-anchor",attrs:{to:"#removepagewherecondition","aria-hidden":"true"}},[e._v("#")]),e._v(" removePageWhere(condition)")],1),e._v(" "),a("p",[e._v("This method allows you to remove a single page from "),a("em",[e._v("miniPress")]),e._v(" that matches a certain condition.")]),e._v(" "),a("p",[a("strong",[e._v("Arguments")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("condition")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Type:")]),e._v(" "),a("code",[e._v("(page: Page) => boolean")])]),e._v(" "),a("li",[a("strong",[e._v("Description:")]),e._v(" A function that will be called by "),a("em",[e._v("miniPress")]),e._v(". Within your implementation you have access to a page. Return "),a("code",[e._v("true")]),e._v(" to remove that page.")])])])])],1)])}),[],!1,null,null,null);"function"==typeof n&&n(i);t.default=i.exports}}]);