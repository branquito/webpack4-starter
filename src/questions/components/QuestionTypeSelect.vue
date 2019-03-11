<template>
  <select
    id="selectQuestionType"
    @change="$emit('load-type', $event.target.value)"
    >
    <option
    v-for="type in types"
    :value="type"
    >{{ type }}</option>
  </select>
</template>
<script>
export default {
  props: {
    types: {
      type: Array,
      required: true,
      default: () => []
    },
    // Sets the selected option to the one that is currently viewed
    getSelected: {
      type: Function,
      required: false
    }
  }
}
</script>
