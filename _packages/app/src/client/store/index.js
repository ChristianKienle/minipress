import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    strict: process.minipress.mode === 'production',
    modules: {
      main,
    },
  })
}
