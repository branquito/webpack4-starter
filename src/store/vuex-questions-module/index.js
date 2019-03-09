import {make} from "vuex-pathify"
import questionsList from "../../questions/data/questionsList.js"

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
      state.items.splice(at, 1, update)
    }
  },
  actions: {
    ...make.actions("items")
  },
  getters: {
    ...make.getters("items")
  }
}
