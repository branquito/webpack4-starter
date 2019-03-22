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
  render(createElement) {
    const scope = this

    const caption = this.questionModel.__id ? 'Edit' : 'Create New'
    const title = createElement(
      'h2',
      {
        class: ['font-normal text-2xl']
      },
      `${caption} Question`
    )
    const separator = createElement('hr', {
      class: ['border', 'my-6']
    })

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
    return createElement('div', {}, [title, separator, ...children])
  }
}
</script>
