(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,,,,,,,,,,,,function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";var i=s(12);s.n(i).a},function(t,e,s){"use strict";var i=s(13);s.n(i).a},function(t,e,s){"use strict";var i=s(14);s.n(i).a},function(t,e,s){"use strict";var i=s(15);s.n(i).a},function(t,e,s){"use strict";var i=s(16);s.n(i).a},function(t,e,s){"use strict";s.r(e);var i={props:{exact:Boolean,link:{type:String},text:{type:String,default:()=>[]}}},n=(s(17),s(1)),l=Object(n.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mp-nav__item"},[e("router-link",{staticClass:"mp-nav__item__link",attrs:{exact:this.exact,to:this.link,"exact-active-class":"mp-nav__item__link--active","active-class":"mp-nav__item__link--active"}},[this._t("default",[this._v(this._s(this.text))])],2)],1)},[],!1,null,null,null).exports,a=(s(18),{components:{MpLogo:Object(n.a)({},function(){var t=this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"logo"},[e("span",{staticClass:"logo__mini"},[e("span",{staticClass:"logo__mini--0"},[this._v("m")]),e("span",{staticClass:"logo__mini--1"},[this._v("i")]),e("span",{staticClass:"logo__mini--2"},[this._v("n")]),e("span",{staticClass:"logo__mini--3"},[this._v("i")])]),this._v("Press")])}],!1,null,null,null).exports,MpNavItem:l},props:{items:{type:Array,default:()=>[]}}}),r=(s(19),Object(n.a)(a,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"mp-nav"},[s("div",{staticClass:"mp-nav__product"},[s("router-link",{staticClass:"mp-nav__product__link",attrs:{"active-class":"","exact-active-class":"",to:"/"}},[s("MpLogo")],1)],1),t._v(" "),s("div",{staticClass:"mp-nav__items"},t._l(t.items,function(e,i){return s("MpNavItem",t._b({key:e.link,attrs:{exact:0===i}},"MpNavItem",e,!1),[t._v("\n      "+t._s(e.text)+"\n    ")])}),1)])},[],!1,null,"d4815ca0",null).exports),c={props:{slug:String,text:String,level:Number,currentHash:String},computed:{classes(){return{"text-base":2==this.level,"text-sm":this.level>2}},linkClasses(){const{slug:t,currentHash:e}=this;return{"mp-toc__item__link--active":`#${t}`===e}}}},u=(s(20),Object(n.a)(c,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"mp-toc__item",class:this.classes,attrs:{"data-toc-item-level":this.level}},[this._t("default")],2)},[],!1,null,null,null).exports),o={props:{slug:String,text:String,level:Number,currentHash:String},computed:{linkClasses(){const{slug:t,currentHash:e}=this;return{"mp-toc__item__link--active":`#${t}`===e}}}},h={components:{MpTocItemLink:Object(n.a)(o,function(){var t=this.$createElement;return(this._self._c||t)("router-link",{staticClass:"mp-toc__item__link",class:this.linkClasses,attrs:{to:{hash:this.slug}}},[this._v("\n  "+this._s(this.text)+"\n")])},[],!1,null,null,null).exports,MpTocItem:u},props:{titleHeading:{type:Object,default:null},headings:{type:Array,default:null}},data:()=>({currentHash:null,observer:null,isRoute:!1,justMounted:!0}),computed:{$_headings(){const{headings:t}=this;return null!=t?t:this.$minipress.headings}},watch:{$_headings:{immediate:!0,handler(){this.setupObserverIfPossible()}},$route(){this.isRoute=!0,this.currentHash=this.$route.hash}},mounted(){this.setupObserverIfPossible()},beforeDestroy(){this.disconnectObserverIfPossible()},methods:{disconnectObserverIfPossible(){null!=this.observer&&(this.observer.disconnect(),this.observer=null)},setupObserverIfPossible(){this.disconnectObserverIfPossible(),null!=this.$el&&(this.observer=new IntersectionObserver(([t])=>{if(this.isRoute||this.justMounted)this.isRoute=!1,this.justMounted=!1;else if(t.boundingClientRect.bottom<=t.intersectionRect.bottom){const e=`#${t.target.id}`;history.replaceState(null,null,e),this.currentHash=e}}),this.$_headings.forEach(t=>{const e=document.querySelector(`#${t.slug}`);null!=e&&this.observer.observe(e)}))},classesForHeading(t){return{"router-link-active":`#${t.slug}`===this.currentHash}}}},_={components:{MpToc:Object(n.a)(h,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.titleHeading?s("MpTocItem",{attrs:{slug:t.titleHeading.slug,level:t.titleHeading.level,text:t.titleHeading.text,"current-hash":t.currentHash}},[t._v("\n    "+t._s(t.titleHeading.text)+"\n  ")]):t._e(),t._v(" "),t._l(t.$_headings,function(e){return s("MpTocItem",{key:e.slug,attrs:{slug:e.slug,level:e.level,text:e.text,"current-hash":t.currentHash}},[s("MpTocItemLink",{attrs:{slug:e.slug,level:e.level,text:e.text,"current-hash":t.currentHash}})],1)})],2)},[],!1,null,null,null).exports},props:{titleHeading:{type:Object,default:null},headings:{type:Array,default:null}}},p=Object(n.a)(_,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mp-left-bar"},[e("MpToc",{attrs:{"title-heading":this.titleHeading,headings:this.headings}})],1)},[],!1,null,null,null).exports;const v=({level:t})=>t>1,m=({level:t})=>1===t;var d={name:"MpLayoutDefault",components:{MpLeftBar:p,MpNav:r},props:{page:{type:Object,default:null}},computed:{$_headings(){return(this.$minipress.headings||[]).filter(v)},$_titleHeading(){const t=(this.$minipress.headings||[]).filter(m);return t.length>0?t[0]:null}}},g=(s(21),Object(n.a)(d,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mp-layout"},[e("MpNav",{staticClass:"mp-layout__nav",attrs:{items:this.$minipress.themeConfig.navbar.items}}),this._v(" "),e("div",{staticClass:"mp-layout__content"},[e("div",{staticClass:"mp-layout__left__container"},[e("MpLeftBar",{directives:[{name:"show",rawName:"v-show",value:this.$_headings.length>0,expression:"$_headings.length > 0"}],staticClass:"mp-layout__left",attrs:{headings:this.$_headings,"title-heading":this.$_titleHeading}})],1),this._v(" "),e("div",{staticClass:"mp-layout__container"},[this._t("default")],2)])],1)},[],!1,null,null,null));e.default=g.exports}]]);
//# sourceMappingURL=1.js.map