import Vue from 'vue'

// import App2 from "./App2.vue"
import App4 from './App4.vue'
// import AppCalculateRate from './AppCalculateRate.vue'
// import AppRenderlessTags from "./components/renderless/AppRenderlessTags.vue"
import AppRenderlessLog from './components/renderless/AppRenderlessLog.vue'
import store from './store'

new Vue({
  el: '#app_alt4',
  store,
  render: h => h(App4)
})

// new Vue({
//   el: "#app_alt2",
//   render: h => h(App2)
// })

// new Vue({
//   el: '#app_alt2',
//   render: h => h(AppRenderlessLog)
// })
