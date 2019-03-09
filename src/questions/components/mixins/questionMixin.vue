<script>
import {call} from "vuex-pathify"
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
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    updateItems: call("questions/setItems"),
    submit() {
      this.updateItems(this.questionModel)
      this.$emit("input", this.questionModel)
    }
  }
}
</script>
