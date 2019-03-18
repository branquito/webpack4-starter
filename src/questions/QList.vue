<template>
  <div :id="stackName">
    <Container
      :get-child-payload="getChildPayload"
      @drop="$emit('drop', stackName, $event)"
      :group-name="groupName"
      class="list-group"
      tag="ul"
      >
      <template v-for="item in items">
        <QListItem
          @remove="$emit('remove-item', item)"
          @edit="$emit('edit-item', item)"
          :item="item"
        ></QListItem>
      </template>
    </Container>
  </div>
</template>
<script>
import { Container } from 'vue-smooth-dnd'
import QListItem from './QListItem.vue'
export default {
  name: 'QuestionsList',
  components: { Container, QListItem },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.label {
  font-weight: normal;
}
</style>
