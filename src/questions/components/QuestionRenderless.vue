<script>
export default {
  name: 'QuestionRenderless',
  model: {
    prop: 'questionModel',
    event: 'update'
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
        console.log('emit update...')
        scope.$emit('update', scope.questionModel)
      }
    })
    return h('div', {}, children)
  }
}
</script>
