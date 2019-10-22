(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{115:function(e,t,s){"use strict";s.r(t);var r=s(83),a=s(50);for(var n in a)"default"!==n&&function(e){s.d(t,e,(function(){return a[e]}))}(n);var i=s(0),o=s(84),c=Object(i.a)(a.default,r.a,r.b,!1,null,null,null);"function"==typeof o.a&&Object(o.a)(c),t.default=c.exports},50:function(e,t,s){"use strict";s.r(t);var r=s(51),a=s.n(r);for(var n in r)"default"!==n&&function(e){s.d(t,e,(function(){return r[e]}))}(n);t.default=a.a},51:function(e,t){},83:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-content"},[s("h2",{attrs:{id:"directory-structure"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#directory-structure","aria-hidden":"true"}},[e._v("#")]),e._v(" Directory Structure")],1),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),s("p",[e._v("There is a lot more to discover – so let’s go.")]),e._v(" "),e._m(2),s("h3",{attrs:{id:"components"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#components","aria-hidden":"true"}},[e._v("#")]),e._v(" components/")],1),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),s("h3",{attrs:{id:"layouts"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#layouts","aria-hidden":"true"}},[e._v("#")]),e._v(" layouts/")],1),e._v(" "),e._m(5),e._v(" "),e._m(6),s("h3",{attrs:{id:"pages"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#pages","aria-hidden":"true"}},[e._v("#")]),e._v(" pages/")],1),e._v(" "),e._m(7)])},a=[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Another way to configure/customize "),t("em",[this._v("miniPress")]),this._v(" is to take advantage of certain conventions.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("For example, every "),t("code",[this._v("*.vue")]),this._v("-file you add inside a directory called "),t("code",[this._v("components")]),this._v(" will be globally registered.")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":""}},[s("div",{pre:!0,attrs:{class:"minipress-highlight-mask language-text"}},[s("div",{pre:!0,attrs:{class:"code-line"}},[e._v(".")]),s("div",{pre:!0,attrs:{class:"code-line highlighted"}},[e._v("├── components")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   ├── table")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   │   ├── index.vue")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   │   └── row.vue")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   └── my-button.vue")]),s("div",{pre:!0,attrs:{class:"code-line highlighted"}},[e._v("├── layouts")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   ├── default.vue")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   └── fullscreen.vue")]),s("div",{pre:!0,attrs:{class:"code-line highlighted"}},[e._v("├── pages")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   ├── about")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   │   ├── contact.md")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   │   ├── index.md")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   │   └── jobs.md")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("│   └── index.md")]),s("div",{pre:!0,attrs:{class:"code-line highlighted"}},[e._v("├── minipress.config.js")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("└── package.json")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("​")])]),s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-text"}},[s("code",{pre:!0,attrs:{class:"language-text"}},[e._v(".\n├── components\n│   ├── table\n│   │   ├── index.vue\n│   │   └── row.vue\n│   └── my-button.vue\n├── layouts\n│   ├── default.vue\n│   └── fullscreen.vue\n├── pages\n│   ├── about\n│   │   ├── contact.md\n│   │   ├── index.md\n│   │   └── jobs.md\n│   └── index.md\n├── minipress.config.js\n└── package.json")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",[e._v("Any "),s("code",[e._v("*.vue")]),e._v(" file placed in the components directory will be registered globally. You can create more directories inside the "),s("code",[e._v("components")]),e._v("-directory. Global components can be used in your pages and in other "),s("code",[e._v("*.vue")]),e._v("-files. The sample directory structure shown above contains three component files: "),s("code",[e._v("table/index.vue")]),e._v(", "),s("code",[e._v("table/row.vue")]),e._v(" and "),s("code",[e._v("my-button.vue")]),e._v(". "),s("em",[e._v("miniPress")]),e._v(" will register these components under the following name:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",[s("li",[s("code",[e._v("my-button.vue")]),e._v(" will be named "),s("code",[e._v("MyButton")])]),e._v(" "),s("li",[s("code",[e._v("table/index.vue")]),e._v(" will be named "),s("code",[e._v("Table-Index")])]),e._v(" "),s("li",[s("code",[e._v("table/row.vue")]),e._v(" will be named "),s("code",[e._v("Table-Row")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Any "),t("code",[this._v("*vue")]),this._v(" file placed in this directory are registered as layout components. The example "),t("code",[this._v("layouts")]),this._v("-directory above contains two layouts. When a page is rendered the "),t("code",[this._v("default")]),this._v("-layout will be used. Use frontmatter to override this:")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"md"}},[s("div",{pre:!0,attrs:{class:"minipress-highlight-mask language-md"}},[s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("---")]),s("div",{pre:!0,attrs:{class:"code-line highlighted"}},[e._v("layout: fullscreen")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("---")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("​")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("# My Fullscreen Page")]),s("div",{pre:!0,attrs:{class:"code-line"}},[e._v("​")])]),s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-md"}},[s("code",{pre:!0,attrs:{class:"language-md"}},[s("span",{pre:!0,attrs:{class:"token hr punctuation"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token title important"}},[e._v("layout: fullscreen\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("---")])]),e._v("\n\n"),s("span",{pre:!0,attrs:{class:"token title important"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("#")]),e._v(" My Fullscreen Page")])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Put markdown ("),t("code",[this._v("*.md")]),this._v(") and Vue ("),t("code",[this._v("*.vue")]),this._v(") files in this directory in order to provide actual content for your site.")])}];s.d(t,"a",(function(){return r})),s.d(t,"b",(function(){return a}))},84:function(e,t,s){"use strict";t.a=function(e){var t=e.options.beforeCreate||[];e.options.beforeCreate=[function(){var e={file:{relative:"_directory-structure.md"},content:"",contentType:"md",headings:[{text:"Directory Structure",slug:"directory-structure",level:2},{text:"components/",slug:"components",level:3},{text:"layouts/",slug:"layouts",level:3},{text:"pages/",slug:"pages",level:3}],regularPath:"/_directory-structure.html",key:"43fa1dd0",frontmatter:{},attributes:{},layout:void 0,path:"/_directory-structure"};this.$page=e}].concat(t)}}}]);