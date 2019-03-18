import uuid4 from 'uuid4'
import QuestionFactory from '../../questions/factories/QuestionFactory.js'
import { getField, updateField } from 'vuex-map-fields'

const state = {
  items: [],
  lists: ['abc']
}

const matchOnId = param => item => item.__id === param.__id

export default {
  namespaced: true,
  state,
  mutations: {
    updateField,
    ADD_ITEM(state, item) {
      state.items.push(item)
    },

    UPDATE_ITEM(state, update) {
      const at = state.items.findIndex(matchOnId(update))
      if (!at < 0) {
        state.items.splice(at, 1, update)
      }
    },

    REMOVE_ITEM(state, remove) {
      state.items = state.items.filter(item => item.__id !== remove.__id)
    },

    SWITCH_MODEL(state, model) {
      const idx = state.items.findIndex(item => item.__id === null)
      if (!(idx < 0)) {
        state.items.splice(idx, 1, model)
      } else {
        state.items.push(model)
      }
    },

    CLEAR_MODEL(state) {
      state.items = state.items.filter(item => item.__id !== null)
    },

    SAVE_ITEM(state, model) {
      const safeId = uuid4()
      state.items.splice(state.items.findIndex(item => item.__id === null), 1, {
        ...model,
        __id: safeId
      })
    },

    ADD_ITEM_TO_LIST(state, item) {
      state.lists.push(item)
    }
  },

  actions: {
    storeModel({ commit, dispatch }, type) {
      const model = QuestionFactory.get(type)
      commit('SWITCH_MODEL', model)
    },

    clearModel({ commit }) {
      commit('CLEAR_MODEL')
    },

    saveItem({ commit, state }, model) {
      commit('SAVE_ITEM', model)
    },

    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item)
    }
  },

  getters: {
    getField,
    items: state => state.items,

    getModel: state => {
      return state.items.find(item => item.__id === null)
    }
  }
}
