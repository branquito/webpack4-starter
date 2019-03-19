import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

import questions from './vuex-questions-module'
import VuexPersist from 'vuex-persist'
import { createHelpers } from 'vuex-map-fields'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const state = {
  user: 'branchito',
  response: null
}

export const { mapFields: mapQuestionFields } = createHelpers({
  getterType: 'questions/getField',
  mutationType: 'questions/updateField'
})

export const { mapFields: mapQuestionListFields } = createHelpers({
  getterType: 'questions/lists/getField',
  mutationType: 'questions/lists/updateField'
})

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state,
  actions,
  getters,
  mutations,
  modules: {
    questions
  }
})

export default store
