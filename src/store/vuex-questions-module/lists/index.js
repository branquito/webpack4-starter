/*
 * Working with lists
 */
import uuid4 from 'uuid4'
import { getField, updateField } from 'vuex-map-fields'

import QuestionFactory from '@/questions/factories/QuestionFactory.js'
import createList from '@/questions/models/list.js'

const state = {
  items: []
}

export default {
  namespaced: true,
  state,
  mutations: {
    updateField,
    addList(state, item) {
      const list = createList({ name: uuid4() })
      state.items.push(createList(list))
    },
    setList(state, { foundListModel, list }) {
      const foundAt = state.items.findIndex(
        item => foundListModel.id === item.id
      )
      state.items.splice(foundAt, 1, { ...foundListModel, questions: list })
    }
  },
  getters: {
    getField
  }
}
