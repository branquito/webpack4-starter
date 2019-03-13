import { make } from 'vuex-pathify'
import uuid4 from 'uuid4'
import QuestionFactory from '../../questions/factories/QuestionFactory.js'

const state = {
  items: [],
  model: {}
}
const matchOnId = update => item => item.__id === update.__id

export default {
  namespaced: true,
  state,
  mutations: {
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
    },
    STORE_MODEL(state, model) {
      state.model = model
    }
  },
  actions: {
    addItem({ commit }, item) {
      // assing some random ID on creation...
      const safeId = uuid4()
      item.__id = safeId
      // store item
      commit('ADD_ITEM', item)
    },
    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item)
    },
    storeModel({ commit }, type) {
      const model = QuestionFactory.get(type)
      commit('STORE_MODEL', model)
    }
  },
  getters: {
    ...make.getters('items'),
    getModel: state => {
      return state.model
    }
  }
}
