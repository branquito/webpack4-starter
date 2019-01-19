import Vue from "vue"

// import App2 from "./App2.vue"
// import App3 from './App3.vue'
// import AppCalculateRate from './AppCalculateRate.vue'
// import AppRenderlessTags from "./components/renderless/AppRenderlessTags.vue"
// import AppRenderlessLog from "./components/renderless/AppRenderlessLog.vue"
import AppPermissionsContainer from "./components/permissions/AppPermissionsContainer.vue"

// new Vue({
//   el: '#app_alt3',
//   render: h => h(App3)
// })

// new Vue({
//   el: "#app_alt2",
//   render: h => h(App2)
// })

// new Vue({
//   el: "#app_alt2",
//   render: h => h(AppRenderlessLog)
// })
new Vue({
  el: "#app_alt3",
  render: h => h(AppPermissionsContainer)
})
