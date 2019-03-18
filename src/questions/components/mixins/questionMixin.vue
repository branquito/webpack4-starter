<script>
import { lowerCase, camelCase } from 'lodash'
import { mapActions } from 'vuex'
export default {
  props: {
    questionModel: {
      type: Object,
      required: true
    },
    // All available question types, registered using QuestionFactory
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
    },
    buttonText() {
      return this.mode === 'create' ? 'Create' : 'Update'
    }
  },
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    ...mapActions('questions', ['updateItem', 'saveItem']),
    submit() {
      switch (this.mode) {
        case 'create':
          this.saveItem(this.questionModel)
          this.$router.push({ path: '/' })
          break
        case 'edit':
          this.updateItem(this.questionModel)
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
