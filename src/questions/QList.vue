<template>
  <div>
    <Container :get-child-payload="getChildPayload" @drop="$emit('drop', $event)" group-name="question-card">
      <Draggable v-for="item in items" :key="item.__id">
        <li class="draggable-item list-group-item">
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
      </Draggable>
    </Container>
  </div>
</template>
<script>
import { Container, Draggable } from 'vue-smooth-dnd'
export default {
  name: 'QuestionsList',
  components: { Container, Draggable },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    getChildPayload(index) {
      return this.items[index]
    },
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
