<template>
  <Draggable
      class=""
      :key="item.__id"
      tag="li"
  >
  <div class="question-group">
    <div class="question-group__question">
      {{ item.question || '...' }}
      <rn-label :text="item.__type"></rn-label>
    </div>
    <div class="question-group__controls">
      <button @click="$emit('remove', item)" class="">edit</button>
      <button @click="$emit('remove', item)" class="">remove</button>
    </div>
  </div>
  </Draggable>
</template>
<script>
import { Draggable } from 'vue-smooth-dnd'
import RnLabel from './components/RnLabel.vue'
export default {
  components: { Draggable, RnLabel },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.question-group {
  display: flex;
  &__question {
    margin-right: auto;
  }
  &__controls {
    flex: 0;
    button {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
