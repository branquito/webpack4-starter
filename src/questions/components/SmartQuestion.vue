<script>
export default {
  functional: true,
  render: function(createElement, { props, data, children }) {
    const model = props.questionModel
    function makeQuestionOfType() {
      if (!model.__cmp) {
        throw new Error('SmartQuestion type is not defined!')
      }
      return model.__cmp // component name is taken from the passed in model, and instance of that type is returned
    }
    // Create component
    return createElement(makeQuestionOfType(), data, children)
  }
}
</script>
