import {make} from "vuex-pathify"
import questionsList from "../../questions/data/questionsList.js"
import uuid4 from "uuid4"

const state = {
  items: questionsList
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
      console.log("in SET_ITEMS")
    },
    ADD_ITEM(state, item) {
      state.items.push(item)
    }
  },
  actions: {
    ...make.actions("items"),
    addItem({commit}, item) {
      // assing some random ID on creation...
      item.__id = uuid4()
      // store item
      commit("ADD_ITEM", item)
    }
  },
  getters: {
    ...make.getters("items")
  }
}
