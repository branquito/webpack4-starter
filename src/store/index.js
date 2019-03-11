import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

import questions from './vuex-questions-module'
import pathify from 'vuex-pathify'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const state = {
  user: 'branchito',
  response: null
}

const store = new Vuex.Store({
  plugins: [pathify.plugin, vuexLocalStorage.plugin],
  state,
  actions,
  getters,
  mutations,
  modules: {
    questions
  }
})

export default store
