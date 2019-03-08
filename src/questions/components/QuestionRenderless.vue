<script>
import questionMixin from './mixins/questionMixin.vue'
export default {
  name: 'QuestionRenderless',
  mixins: [questionMixin],
  render(h) {
    const children = this.$scopedSlots.default({
      data: this.value
    })
    return h('div', {}, children)
  }
}
</script>
