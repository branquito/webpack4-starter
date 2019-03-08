import babelPolyfill from 'babel-polyfill'
import Vue from 'vue'

// import App2 from "./App2.vue"
// import App4 from './App4.vue' // draggables
// import AppCalculateRate from './AppCalculateRate.vue'
// import AppRenderlessTags from "./components/renderless/AppRenderlessTags.vue"
import AdvancedArchitecture from './advanced_arch/Index.vue'
import AppRenderlessLog from './components/renderless/AppRenderlessLog.vue'

import AppQuestions from './questions/App.vue'
import Questions from './questions/Index.vue'
import SmartQuestion from './questions/components/SmartQuestion.vue'

import questionsList from './questions/data/questionsList.js'

import VueRouter from 'vue-router'
import store from './store'

import questionsRoutes from './questions/routes'

Vue.use(VueRouter)

const routes = [...questionsRoutes]

const router = new VueRouter({
  routes
})

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
