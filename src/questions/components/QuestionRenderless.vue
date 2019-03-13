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
  methods: {
    addOption(option) {
      this.questionModel.options.push(option)
      this.$emit('update', this.questionModel)
    }
  },
  render(h) {
    const scope = this
    const children = this.$scopedSlots.default({
      data: this.questionModel,
      addOption: this.addOption
    })
    return h('div', {}, children)
  }
}
</script>
