<script>
import { commit, call } from 'vuex-pathify'
import { lowerCase, camelCase } from 'lodash'
export default {
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
    },
    buttonText() {
      return this.mode === 'create' ? 'Create' : 'Update'
    }
  },
  created() {
    // this.$store.commit('questions/PRE_CREATE', this.questionModel)
    this.cmpName = this.$options.name
  },
  methods: {
    updateItem: call('questions/updateItem'),
    addItem: call('questions/addItem'),
    submit() {
      switch (this.mode) {
        case 'edit':
          this.updateItem(this.questionModel)
          this.$router.push({ path: '/' })
          break
        case 'create':
          this.addItem(this.questionModel)
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
