<script>
export default {
  name: 'QuestionRenderless',
  props: {
    questionModel: {
      type: Object,
      required: true
    }
  },
  render(h) {
    const scope = this
    const children = this.$scopedSlots.default({
      data: this.questionModel,
      addOption(option) {
        scope.questionModel.options.push(option)
      }
    })
    return h('div', {}, children)
  }
}
</script>
