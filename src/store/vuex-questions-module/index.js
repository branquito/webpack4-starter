import { make } from 'vuex-pathify'
import uuid4 from 'uuid4'

const state = {
  items: [],
  preCreate: {}
}
const matchOnId = update => item => item.__id === update.__id

export default {
  namespaced: true,
  state,
  mutations: {
    PRE_CREATE(state, item) {
      state.preCreate = item
    },
    ADD_ITEM(state, item) {
      state.items.push(item)
    },
    UPDATE_ITEM(state, update) {
      const at = state.items.findIndex(matchOnId(update))
      if (!at < 0) {
        state.items.splice(at, 1, update)
      }
    },
    REMOVE_ITEM(state, item) {
      state.items = state.items.filter(o => o.__id !== item.__id)
    }
  },
  actions: {
    addItem({ commit }, item) {
      // assing some random ID on creation...
      item.__id = uuid4()
      // store item
      commit('ADD_ITEM', item)
    },
    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item)
    }
  },
  getters: {
    ...make.getters('items')
  }
}
