import {make} from "vuex-pathify"

const state = {
  questions: []
}

export default {
  namespaced: true,
  state,
  mutations: {
    SET_QUESTIONS(state, item) {
      console.log("Setting questions...")
      state.questions.push(item)
    }
  },
  actions: {
    // ...make.actions("questions")
  }
}
