import { make } from 'vuex-pathify'
import uuid4 from 'uuid4'

const state = {
  items: [],
  newItem: {}
}
const matchId = update => item => item.__id === update.__id

export default {
  namespaced: true,
  state,
  mutations: {
    SET_ITEMS(state, update) {
      const at = state.items.findIndex(matchId(update))
      if (!at < 0) {
        state.items.splice(at, 1, update)
      }
      console.log('in SET_ITEMS')
    },
    ADD_ITEM(state, item) {
      state.items.push(item)
    },
    ADD_NEW(state, item) {
      state.newItem = item
    },
    REMOVE_ITEM(state, item) {
      state.items = state.items.filter(o => o.__id !== item.__id)
    }
  },
  actions: {
    ...make.actions('items'),
    addItem({ commit }, item) {
      // assing some random ID on creation...
      item.__id = uuid4()
      // store item
      commit('ADD_ITEM', item)
    }
  },
  getters: {
    ...make.getters('items')
  }
}
