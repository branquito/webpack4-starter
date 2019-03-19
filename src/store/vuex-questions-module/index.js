import uuid4 from 'uuid4'
import QuestionFactory from '../../questions/factories/QuestionFactory.js'

import { getField, updateField } from 'vuex-map-fields'

/*
 * Question lists
 */
import lists from './lists'

const state = {
  items: []
}

const matchOnId = param => item => item.__id === param.__id

export default {
  namespaced: true,
  state,
  mutations: {
    updateField,

    update(state, update) {
      const at = state.items.findIndex(matchOnId(update))
      if (!at < 0) {
        state.items.splice(at, 1, update)
      }
    },

    remove(state, remove) {
      state.items = state.items.filter(item => item.__id !== remove.__id)
    },

    /*
    * Switches model while in creation mode
    */
    switch(state, model) {
      const idx = state.items.findIndex(item => item.__id === null)
      if (!(idx < 0)) {
        state.items.splice(idx, 1, model)
      } else {
        state.items.push(model)
      }
    },

    /*
     * Clears model, on cancel/ESC
     */
    clearModel(state) {
      state.items = state.items.filter(item => item.__id !== null)
    },

    /*
    * Saves question
    */
    save(state, model) {
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
      commit('switch', model)
    },

    clearModel({ commit }) {
      commit('clearModel')
    },

    saveItem({ commit, state }, model) {
      commit('save', model)
    },

    updateItem({ commit }, item) {
      commit('update', item)
    }
  },

  getters: {
    getField,
    items: state => state.items,

    getModel: state => {
      return state.items.find(item => item.__id === null)
    }
  },
  modules: {
    lists: lists
  }
}
