<template>
  <div>
    <ul class="list-group">
      <li v-for="item in questions" class="list-group-item">
        <div class="question-group">
          <div class="question-group__question">
            {{ item.question || '...' }}
            <span class="label label-info">{{ item.__type }}</span>
          </div>
          <div class="question-group__controls">
            <button @click="edit(item)" class="btn btn-info btn-xs">
              <i class="glyphicon glyphicon-edit"></i>
            </button>
            <button @click="remove(item)" class="btn btn-danger btn-xs">
              <i class="glyphicon glyphicon-remove-circle"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import questionsList from './data/questionsList.js'
export default {
  name: 'QuestionsList',
  data() {
    return {
      questions: questionsList
    }
  },
  methods: {
    remove(item) {
      this.$emit('remove-item', item)
    },
    edit(item) {
      this.$emit('edit-item', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.label {
  font-weight: normal;
}
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
