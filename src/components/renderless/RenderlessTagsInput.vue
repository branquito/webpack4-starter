<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    removeTag(tag) {
      this.$emit("input", this.value.filter(t => t !== tag))
    }
  },
  render() {
    return this.$scopedSlots.default({
      tags: this.value,
      removeTag: this.removeTag
    })
  }
}
</script>
