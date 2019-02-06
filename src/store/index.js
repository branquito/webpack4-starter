import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  user: 'branchito',
  response: null
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})

export default store
