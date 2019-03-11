<script>
import { commit, call } from 'vuex-pathify'
import { lowerCase } from 'lodash'
export default {
  model: {
    prop: 'questionModel',
    event: 'input'
  },
  props: {
    questionModel: {
      type: Object,
      required: true
    },
    // All question types, that are registered using QuestionFactory
    questionTypes: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    mode() {
      return this.questionModel.__id ? 'edit' : 'create'
    },
    hasOptions() {
      const opts = this.questionModel.options
      return opts && !!opts.length // opts || undefined
    }
  },
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    updateItems: call('questions/setItems'),
    addItem: call('questions/addItem'),
    submit() {
      switch (this.mode) {
        case 'edit':
          this.updateItems(this.questionModel)
          this.$emit('input', this.questionModel)
          this.$router.push({ path: '/' })
          break
        case 'create':
          this.addItem(this.questionModel)
          this.$emit('input', this.questionModel)
          this.$router.push({ path: '/' })
          break
      }
      this.$emit('modal-close')
    },
    getActiveQuestionTypeSelection(type) {
      return lowerCase(this.questionModel.__type) === lowerCase(type)
    }
  }
}
</script>
