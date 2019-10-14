import Vue from 'vue'
import Demo from './demo.vue'
import VueRouter from 'vue-router'
import Layout from './layout.vue'

Vue.use(VueRouter)
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
