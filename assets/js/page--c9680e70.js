(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{50:function(e,t,s){"use strict";s.r(t);var a={layout:"default"},i=s(0),n=function(e){var t=e.options.beforeCreate||[];e.options.beforeCreate=[function(){var e,t,s,a,i={key:"c9680e70",path:"/configuration",file:{relative:"configuration.md"},content:"",contentType:"md",headings:[{text:"Configuration",slug:"configuration",level:1},{text:"Basics",slug:"basics",level:2},{text:"cwd",slug:"cwd",level:3},{text:e="port",slug:e,level:3},{text:t="host",slug:t,level:3},{text:s="apply",slug:s,level:3},{text:"Access to the API",slug:"access-to-the-api",level:4},{text:a="plugins",slug:a,level:3},{text:"Example",slug:"example",level:4}],regularPath:"/configuration.html",frontmatter:{},attributes:{}};this.$page=i}].concat(t)},r=Object(i.a)(a,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("MiniLayout",[s("div",[s("h1",{attrs:{id:"configuration"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#configuration","aria-hidden":"true"}},[e._v("#")]),e._v(" Configuration")],1),e._v(" "),s("p",[e._v("You can configure certain aspects of "),s("em",[e._v("miniPress")]),e._v(" by creating a configuration file called "),s("code",[e._v("minipress.config.js")]),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"basics"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#basics","aria-hidden":"true"}},[e._v("#")]),e._v(" Basics")],1),e._v(" "),s("p",[e._v("A "),s("em",[e._v("miniPress")]),e._v(" configuration file is a normal "),s("em",[e._v("CommonJS")]),e._v("-module and basically looks like this:")]),e._v(" "),s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[s("code",{pre:!0,attrs:{class:"language-js"}},[e._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/* put your settings here */")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])])]),s("h3",{attrs:{id:"cwd"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#cwd","aria-hidden":"true"}},[e._v("#")]),e._v(" cwd")],1),e._v(" "),s("ul",[s("li",[e._v("Type: "),s("code",[e._v("string")])]),e._v(" "),s("li",[e._v("Default: "),s("code",[e._v("process.cwd()")])])]),e._v(" "),s("p",[e._v("Specify a directory which acts as the root of your "),s("em",[e._v("miniPress")]),e._v(" project. This directory is used as the base for many other directories ("),s("code",[e._v(".temp")]),e._v(", "),s("code",[e._v(".minipress")]),e._v(", …).")]),e._v(" "),s("h3",{attrs:{id:"port"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#port","aria-hidden":"true"}},[e._v("#")]),e._v(" port")],1),e._v(" "),s("ul",[s("li",[e._v("Type: "),s("code",[e._v("number")])]),e._v(" "),s("li",[e._v("Default: "),s("code",[e._v("4000")])])]),e._v(" "),s("p",[e._v("Specify the port used when something has to be served via "),s("em",[e._v("HTTP")]),e._v(". Usually you can override this via the CLI by using "),s("code",[e._v("--port <port>")]),e._v(" – for example:")]),e._v(" "),s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"sh"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-sh"}},[s("code",{pre:!0,attrs:{class:"language-sh"}},[e._v("minipress dev --port "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("8080")])])])]),s("p",[e._v("will run "),s("em",[e._v("miniPress")]),e._v(" on port "),s("code",[e._v("8080")]),e._v(" – even though it may be set to something different in the configuration file.")]),e._v(" "),s("h3",{attrs:{id:"host"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#host","aria-hidden":"true"}},[e._v("#")]),e._v(" host")],1),e._v(" "),s("ul",[s("li",[e._v("Type: "),s("code",[e._v("string")])]),e._v(" "),s("li",[e._v("Default: "),s("code",[e._v('"0.0.0.0"')])])]),e._v(" "),s("p",[e._v("Specify the host to be used when something has to be served via "),s("em",[e._v("HTTP")]),e._v(".")]),e._v(" "),s("h3",{attrs:{id:"apply"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#apply","aria-hidden":"true"}},[e._v("#")]),e._v(" apply")],1),e._v(" "),s("p",[s("code",[e._v("apply")]),e._v(" is probably one of the most powerful things you can do in your configuration file.")]),e._v(" "),s("h4",{attrs:{id:"access-to-the-api"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#access-to-the-api","aria-hidden":"true"}},[e._v("#")]),e._v(" Access to the API")],1),e._v(" "),s("p",[e._v("It opens up the whole "),s("em",[e._v("miniPress")]),e._v("-API for you. "),s("code",[e._v("apply")]),e._v(" is also the main entry point for "),s("em",[e._v("miniPress")]),e._v(" plugins.")]),e._v(" "),s("MiniTip",{attrs:{title:"TIP"}},[s("p",[e._v("If you want to learn more about plugins you should head over to the "),s("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/index.md")}},[e._v("Plugins Guide")]),e._v(".")],1)]),e._v(" "),s("p",[s("code",[e._v("apply")]),e._v(" is a function that is invoked by "),s("em",[e._v("miniPress")]),e._v(" once – relatively early on. Within your implementation of "),s("code",[e._v("apply")]),e._v(" you have access to the "),s("em",[e._v("miniPress")]),e._v("-instance. The "),s("em",[e._v("miniPress")]),e._v("-instance allows you to do a lot. Again: Please refer to the "),s("MiniLink",{attrs:{to:e.$minipress.pageLink("/plugins-and-themes/index.md")}},[e._v("Plugins Guide")]),e._v(" for more details.")],1),e._v(" "),s("h3",{attrs:{id:"plugins"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#plugins","aria-hidden":"true"}},[e._v("#")]),e._v(" plugins")],1),e._v(" "),s("p",[s("code",[e._v("plugins")]),e._v(" allows you to configure "),s("em",[e._v("miniPress")]),e._v(" plugins.")]),e._v(" "),s("h4",{attrs:{id:"example"}},[s("router-link",{staticClass:"header-anchor",attrs:{to:"#example","aria-hidden":"true"}},[e._v("#")]),e._v(" Example")],1),e._v(" "),s("p",[e._v("The example below shows a "),s("code",[e._v("minipress.config.js")]),e._v("-file which installes an already existing plugin:")]),e._v(" "),s("div",{pre:!0,attrs:{class:"minipress-highlight","data-lang":"js"}},[s("pre",{pre:!0,attrs:{class:"minipress-highlight-code language-js"}},[s("code",{pre:!0,attrs:{class:"language-js"}},[e._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'@minipress/plugin-last-modified'")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("/*, options */")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")])])])]),s("p",[e._v("This installs the "),s("code",[e._v("@minipress/plugin-last-modified")]),e._v("-plugin which basically simply adds a last modified date to each page.")])],1)])}),[],!1,null,null,null);"function"==typeof n&&n(r);t.default=r.exports}}]);