<script>
export default {
  functional: true,
  render: createElement => {
    return createElement("h1", this.$slots.default)
  }
}
</script>
