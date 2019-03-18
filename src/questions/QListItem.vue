<template>
  <li class="draggable-item list-group-item">
    <div class="question-group">
      <div class="question-group__question">
        {{ item.question || '...' }}
        <span class="label label-info">{{ item.__type }}</span>
      </div>
      <div class="question-group__controls">
        <button @click="$emit('edit', item)" class="btn btn-info btn-xs">
          <i class="glyphicon glyphicon-edit"></i>
        </button>
        <button @click="$emit('remove', item)" class="btn btn-danger btn-xs">
          <i class="glyphicon glyphicon-remove-circle"></i>
        </button>
      </div>
    </div>
  </li>
</template>
<script>
export default {
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
