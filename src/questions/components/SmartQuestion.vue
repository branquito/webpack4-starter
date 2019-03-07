<script>
import FreeFormQuestion from './FreeFormQuestion.vue'
export default {
  functional: true,
  render: function(createElement, { props, data, children }) {
    function makeQuestionOfType() {
      if (!props.value.__type) {
        throw new Error('SmartQuestion type is not defined!')
      }
      return props.value.__type
    }
    return createElement(makeQuestionOfType(), data, children)
  }
}
</script>
