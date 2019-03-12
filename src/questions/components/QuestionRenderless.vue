<script>
import questionMixin from "./mixins/questionMixin.vue"
export default {
  name: "QuestionRenderless",
  mixins: [questionMixin],
  render(h) {
    const scope = this
    const children = this.$scopedSlots.default({
      data: this.questionModel,
      addOption(option) {
        scope.questionModel.options.push(option)
      }
    })
    return h("div", {}, children)
  }
}
</script>
