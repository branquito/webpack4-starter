<script>
export default {
  props: {
    value: {}, // log anything, do not need to check or validate
    format: {
      type: Function
    }
  },
  watch: {
    value() {
      const logged = this.format ? this.format(this.value) : this.value

      console.log(logged)
    }
  },
  render() {
    return null // we do not need slot for this
  }
}
</script>
