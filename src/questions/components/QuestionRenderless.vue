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
  data() {
    return {
      option: ''
    }
  },
  methods: {
    addOption(option) {
      this.questionModel.options.push(this.option)
      this.$emit('update', this.questionModel)
    }
  },
  render(h) {
    const scope = this
    const children = this.$scopedSlots.default({
      data: this.questionModel,
      option: this.option,
      addOption: this.addOption,
      /*
       * Attributes to be bound, when adding new options
       */
      inputAttrs: {
        value: this.option
      },
      /*
       * Events that will be catched here, when used in parent component
       */
      inputEvents: {
        input: e => {
          this.option = e.target.value
        }
      }
    })
    return h('div', {}, children)
  }
}
</script>
