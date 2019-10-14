import Vue from 'vue'
import Demo from './demo.vue'
import VueRouter from 'vue-router'
import Layout from './layout.vue'
import BuiltInComponents from './../src/index'

Vue.use(VueRouter)
Vue.use(BuiltInComponents)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Demo
    }
  ]
})
new Vue({
  router,
  render: h => h(Layout),
}).$mount('#app')
