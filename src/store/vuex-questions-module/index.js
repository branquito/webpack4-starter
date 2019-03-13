import { make } from 'vuex-pathify'
import uuid4 from 'uuid4'
import QuestionFactory from '../../questions/factories/QuestionFactory.js'

const state = {
  items: []
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

    SWITCH_MODEL(state, model) {
      const idx = state.items.findIndex(item => item.__id === null)
      if (!(idx < 0)) {
        state.items.splice(idx, 1, model)
      } else {
        state.items.push(model)
      }
    },

    SAVE_ITEM(state, model) {
      const safeId = uuid4()
      state.items.splice(state.items.findIndex(item => item.__id === null), 1, {
        ...model,
        __id: safeId
      })
    }
  },

  actions: {
    storeModel({ commit, dispatch }, type) {
      const model = QuestionFactory.get(type)
      commit('SWITCH_MODEL', model)
    },

    saveItem({ commit, state }, model) {
      commit('SAVE_ITEM', model)
    },

    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item)
    }
  },
  getters: {
    ...make.getters('items'),
    getModel: state => {
      return state.items.find(item => item.__id === null)
    }
  }
}
