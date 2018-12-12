import Vue from "vue"

import App2 from "./App2.vue"
import App3 from "./App3.vue"

new Vue({
  el: "#app_alt3",
  render: h => h(App3)
})

new Vue({
  el: "#app_alt2",
  render: h => h(App2)
})
