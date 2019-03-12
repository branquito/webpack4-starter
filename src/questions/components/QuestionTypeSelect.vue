<template>
  <select
    @change="$emit('load-type', $event.target.value)"
    >
    <option
      v-for="type in types"
      :value="type"
      :selected="getSelected(type)"
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
    /*
     * Preselect current view
     */
    getSelected: {
      type: Function,
      required: false,
      default: () => {
        return () => {}
      }
    }
  }
}
</script>
