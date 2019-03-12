<script>
export default {
  name: 'QuestionRenderless',
  model: {
    prop: 'questionModel',
    event: 'input'
  },
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
        console.log('emit input...')
        scope.$emit('input', scope.questionModel)
      }
    })
    return h('div', {}, children)
  }
}
</script>
