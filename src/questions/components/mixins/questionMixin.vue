<script>
export default {
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
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    submit() {
      this.$emit('input', this.questionModel)
    }
  }
}
</script>
