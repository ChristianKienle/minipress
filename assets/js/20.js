(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{105:function(t,a,s){"use strict";s.r(a);var e=s(84),n=s(57);for(var r in n)"default"!==r&&function(t){s.d(a,t,(function(){return n[t]}))}(r);var o=s(0),p=s(85),c=Object(o.a)(n.default,e.a,e.b,!1,null,null,null);"function"==typeof p.a&&Object(p.a)(c),a.default=c.exports},57:function(t,a,s){"use strict";s.r(a);var e=s(58),n=s.n(e);for(var r in e)"default"!==r&&function(t){s.d(a,t,(function(){return e[t]}))}(r);a.default=n.a},58:function(t,a){},84:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"page-content"},[s("h1",{attrs:{id:"internals"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#internals","aria-hidden":"true"}},[t._v("#")]),t._v(" Internals")],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),s("h2",{attrs:{id:"how-pages-come-to-life"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#how-pages-come-to-life","aria-hidden":"true"}},[t._v("#")]),t._v(" How Pages come to Life")],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),s("h2",{attrs:{id:"learnings"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#learnings","aria-hidden":"true"}},[t._v("#")]),t._v(" Learnings")],1),t._v(" "),s("h3",{attrs:{id:"plugintheme-api"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#plugintheme-api","aria-hidden":"true"}},[t._v("#")]),t._v(" Plugin/Theme-API")],1),t._v(" "),s("p",[t._v("Originally I wanted to have a plugin-/theme-API like plugins in Rollup are done:")]),t._v(" "),t._m(7),t._v(" "),t._m(8),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),s("h2",{attrs:{id:"asyncdata"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#asyncdata","aria-hidden":"true"}},[t._v("#")]),t._v(" asyncData")],1),t._v(" "),s("p",[t._v("Two things:")]),t._v(" "),t._m(12),t._v(" "),s("p",[t._v("Let’s assume you have a page that looks like this:")]),t._v(" "),t._m(13),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._m(18),t._v(" "),t._m(19)])},n=[function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("If you want to know how "),a("em",[this._v("miniPress")]),this._v(" works internally – this guide is for you.")])},function(){var t=this.$createElement,a=this._self._c||t;return a("blockquote",[a("p",[a("strong",[this._v("A word of caution:")]),this._v("\nThe internals change very frequently as I learn new things. Also – my understanding might be incorrect.")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Let’s assume that there is a directory called "),a("code",[this._v("pages/")]),this._v(", which contains all of your Markdown files. Each file represents a page. When "),a("em",[this._v("miniPress")]),this._v(" is started, it looks in that directory and finds all Markdown files. It makes a note of each file and basically just renders the Markdown file using it’s custom Markdown setup. So basically this is what happens ("),a("em",[this._v("pseudocode")]),this._v("):")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[s("code",{pre:!0,attrs:{class:"language-js"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" paths "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findPagesIn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pages/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\npaths"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("path")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Page")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("The Markdown pipeline is setup in a "),a("strong",[this._v("special way")]),this._v(":")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",[s("li",[s("code",[t._v("render()")]),t._v(" does some preprocessing (extract frontmatter, …) and the renders the page by basically invoking each Markdown(-it)-plugin.")]),t._v(" "),s("li",[t._v("Each Markdown plugin knows which "),s("code",[t._v("Page")]),t._v("-instance it operates on.")]),t._v(" "),s("li",[t._v("Each Markdown plugin does it’s job and then simply sets properties on the page instance as needed.")]),t._v(" "),s("li",[t._v("For example – the headings plugin sets the "),s("code",[t._v("headings")]),t._v("-property on the page instance.")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("After the "),a("em",[this._v("initial")]),this._v(" render process the "),a("code",[this._v("Page")]),this._v("-instances are pre-populated with all the data we need.")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("strong",[this._v("Custom Theme:")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[s("code",{pre:!0,attrs:{class:"language-js"}},[t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* my theme implementation goes here */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("strong",[this._v("Theme Consumer:")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[s("code",{pre:!0,attrs:{class:"language-js"}},[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" CustomTheme "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-custom-theme'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  theme"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" CustomTheme\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("p",[t._v("However, this has one big disadvantage: "),s("em",[t._v("miniPress")]),t._v(" no longer knows the location of "),s("code",[t._v("CustomTheme")]),t._v(" in the file system. This means that it cannot apply certain conventions for example automatically registering components found in "),s("code",[t._v("components/")]),t._v(". Probably that is why "),s("em",[t._v("VuePress")]),t._v(" requires you to specify plugins by name. It is also possible to pass "),s("em",[t._v("VuePress")]),t._v(" a function as a plugin but I have no idea how they do it.")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ol",[a("li",[this._v("First, I will describe how nuxt supports "),a("code",[this._v("asyncData")]),this._v(" and then")]),this._v(" "),a("li",[this._v("I will describe how it works in miniPress")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"markup"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-markup"}},[s("code",{pre:!0,attrs:{class:"language-markup"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{firstname}} – {{lastname}}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" fetchLastName "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./fetch-last-name'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("firstName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("asyncData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// < returns a promise that resolves to:")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { lastName: 'Borg' } (or some other last name)")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetchLastName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("Now the user navigates to this page. Then "),a("code",[this._v("asyncData")]),this._v(" is called on the server side and not again on the client. "),a("code",[this._v("asyncData")]),this._v(" is called on the client for every page visited after the first one. The intention is probably to have a fast first page load and then the client takes over the control of "),a("code",[this._v("asyncData")]),this._v(" for all subsequent site naviations.")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("p",[t._v("Note: Executing "),s("code",[t._v("nuxt generate")]),t._v(" causes "),s("code",[t._v("asyncData")]),t._v(" to be executed for each page (that does not have a dynamic route). Each "),s("code",[t._v("asyncData")]),t._v(" is made part of the corresponding page bundle. But this bundled "),s("code",[t._v("asyncData")]),t._v(" is only used for the initial page load (even for statically built sites). This may be what I want – or it may not be what I want. Where it breaks down is in cases where "),s("code",[t._v("asyncData")]),t._v(" truly returns “static” data.")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("This is how "),a("code",[this._v("asyncData")]),this._v(" looks in miniPress:")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"markup"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-markup"}},[s("code",{pre:!0,attrs:{class:"language-markup"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{firstname}} – {{lastname}}"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" fetchLastName "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./fetch-last-name'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("firstName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("asyncData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("asyncDataSSR")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("asyncDataSSR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lastName "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" asyncDataSSR\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetchLastName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("p",[s("em",[t._v("miniPress")]),t._v(" calls "),s("code",[t._v("asyncData")]),t._v(" twice. ALWAYS. Once on the server and the again on the client. The "),s("code",[t._v("asyncDataSSR")]),t._v(" argument contains a copy of what has been generated during SSR. This can be "),s("code",[t._v("{}")]),t._v(" in case "),s("code",[t._v("asyncData")]),t._v(" is currently executed on the server. In other cases it is just whatever "),s("code",[t._v("asyncData")]),t._v(" returned during SSR. This allows you to check the contents of "),s("code",[t._v("asyncDataSSR")]),t._v(". In the case above I check whether or not it contains a "),s("code",[t._v("lastName")]),t._v(". If it does "),s("code",[t._v("asyncDataSSR")]),t._v(" is good enough for my use case and I simply return "),s("code",[t._v("asyncDataSSR")]),t._v(". If it does not contain "),s("code",[t._v("lastName")]),t._v(" I am fetching the last name from the backend.")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",[s("li",[t._v("During Development miniPress initially sets "),s("code",[t._v("asyncDataSSR")]),t._v(" to "),s("code",[t._v("{}")]),t._v(" (when not disabled with "),s("code",[t._v("--keep-cache")]),t._v(") for every page. "),s("code",[t._v("asyncData")]),t._v(" is called lazily – once you visit the corresponding page.")]),t._v(" "),s("li",[t._v("When building a static version of the site "),s("code",[t._v("asyncData")]),t._v(" is invoked for each page and also bundled with each page so that subsequent invokations come with the "),s("code",[t._v("asyncDataSSR")]),t._v(" argument.")])])}];s.d(a,"a",(function(){return e})),s.d(a,"b",(function(){return n}))},85:function(t,a,s){"use strict";a.a=function(t){var a=t.options.beforeCreate||[];t.options.beforeCreate=[function(){var t={key:"ca11f630",path:"/internals",file:{relative:"internals.md"},content:"",contentType:"md",headings:[{text:"Internals",slug:"internals",level:1},{text:"How Pages come to Life",slug:"how-pages-come-to-life",level:2},{text:"Learnings",slug:"learnings",level:2},{text:"Plugin/Theme-API",slug:"plugintheme-api",level:3},{text:"asyncData",slug:"asyncdata",level:2}],regularPath:"/internals.html",frontmatter:{},attributes:{},layout:void 0};this.$page=t}].concat(a)}}}]);