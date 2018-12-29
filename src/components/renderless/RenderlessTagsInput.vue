<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newTag: ""
    }
  },
  // test adding comments here... oh, they look so nice...
  methods: {
    addTag() {
      if (
        this.newTag.trim().length === 0 ||
        this.value.includes(this.newTag.trim())
      ) {
        return
      }
      this.$emit("input", [...this.value, this.newTag.trim()])
      this.newTag = ""
    },
    removeTag(tag) {
      this.$emit("input", this.value.filter(t => t !== tag))
    }
  },
  render() {
    const vm = this
    return this.$scopedSlots.default({
      tags: this.value, // model proxy
      removeTag: this.removeTag,
      inputAttrs: {
        value: this.newTag
      },
      inputEvents: {
        input: e => {
          this.newTag = e.target.value
        },
        keydown: e => {
          if (e.keyCode === 13) {
            e.preventDefault()
            this.addTag()
            vm.$nextTick(() => {
              this.$parent.$el.querySelector("." + e.target.className).focus()
            })
          }
        }
      }
    })
  }
}
</script>
