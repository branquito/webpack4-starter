<template>
  <Draggable
      class=""
      :key="item.__id"
      tag="li"
  >
  <div class="box-wrapper bg-rn-grey-lighter border border-rn-grey-light p-3a mb-3">
    <div class="question-group">
      <div class="question-group__question">
        {{ item.question || '...' }}
      </div>
      <div class="question-group__controls">
        <rn-label :text="item.__type"></rn-label>
        <button @click="$emit('edit', item)" class="">E</button>
        <button @click="$emit('remove', item)" class="">R</button>
      </div>
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
li {
  overflow: visible;
}
.question-group {
  display: flex;
  &__question {
    flex-shrink: 1;
    margin-right: auto;
  }
  &__controls {
    display: flex;
    align-items: center;
  }
}
</style>
