<script>
import {commit, call} from "vuex-pathify"
export default {
  model: {
    prop: "questionModel",
    event: "input"
  },
  props: {
    questionModel: {
      type: Object,
      required: true
    }
  },
  computed: {
    mode() {
      return this.questionModel.__id ? "edit" : "create"
    }
  },
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    updateItems: call("questions/setItems"),
    addItem: call("questions/addItem"),
    submit() {
      switch (this.mode) {
        case "edit":
          this.updateItems(this.questionModel)
          this.$emit("input", this.questionModel)
          break
        case "create":
          this.addItem(this.questionModel)
          this.$emit("input", this.questionModel)
          break
      }
    }
  }
}
</script>
