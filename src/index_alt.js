import babelPolyfill from 'babel-polyfill'
import Vue from 'vue'

// import App2 from "./App2.vue"
// import App4 from './App4.vue' // draggables
// import AppCalculateRate from './AppCalculateRate.vue'
// import AppRenderlessTags from "./components/renderless/AppRenderlessTags.vue"
import AdvancedArchitecture from './advanced_arch/Index.vue'
import AppRenderlessLog from './components/renderless/AppRenderlessLog.vue'

import store from './store'
import AppQuestions from './questions/App.vue'
import Questions from './questions/Index.vue'
import SmartQuestion from './questions/components/SmartQuestion.vue'

import questionsRoutes from './questions/routes'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [...questionsRoutes]

const router = new VueRouter({
  routes
})
const create = p => p.includes('/create')
const clearModelWhenNotSwitchingQuestionTypes = (to, from, next) => {
  if (create(from.path) && !create(to.path)) {
    store.dispatch('questions/clearModel')
  }
  next()
}
router.beforeEach(clearModelWhenNotSwitchingQuestionTypes)

new Vue({
  el: '#app_alt4',
  store,
  router,
  render: h => h(AppQuestions)
})

// new Vue({
//   el: "#app_alt2",
//   render: h => h(App2)
// })

// new Vue({
//   el: '#app_alt2',
//   render: h => h(AppRenderlessLog)
// })
