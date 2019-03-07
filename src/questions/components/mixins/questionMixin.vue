<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  created() {
    this.cmpName = this.$options.name
  },
  methods: {
    submit() {
      this.$emit('input', this.value)
    }
  }
}
</script>
