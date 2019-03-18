<template>
  <div id="stackName">
    <Container
      :get-child-payload="getChildPayload"
      @drop="$emit('drop', stackName, $event)"
      :group-name="groupName"
      drag-class="opacity-ghost"
      >
      <Draggable v-for="item in items" :key="item.__id">
        <QListItem
          @remove="remove"
          @edit="edit"
          :item="item"
        ></QListItem>
      </Draggable>
    </Container>
  </div>
</template>
<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import QListItem from './QListItem.vue'
export default {
  name: 'QuestionsList',
  components: { Container, Draggable, QListItem },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    stackName: {
      type: String,
      required: false
    },
    /*
     *  Proxy for Container groupName property
     */
    groupName: {
      type: String,
      required: false
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
.opacity-ghost {
  transform: rotate(5deg);
  transition: transform 0.1s;
}
</style>
