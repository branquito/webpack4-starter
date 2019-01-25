import Vue from "vue"
Vue.component("select-options", {
  props: {
    options: Array,
    visible: String
  },
  render(h) {
    return h(
      "div",
      {
        class: ["dropdown-menu"],
        style: {
          display: this.visible
        }
      },
      [
        this.options.map(option => {
          return this.$scopedSlots.default(option)
        })
      ]
    )
  }
})
