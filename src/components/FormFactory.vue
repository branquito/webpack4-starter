<template>
  <ul>
    <li v-for="control in controls">
      <el-factory :control="control" :model="value" @input="updateModel"></el-factory>
    </li>
  </ul>
</template>

<script>
import elFactory from './functional/elFactory.vue'
import { set } from 'lodash'
export default {
  components: { elFactory },
  props: {
    value: {
      type: Object
    },
    schema: {
      type: Object,
      required: true
    }
  },
  computed: {
    controls() {
      return Object.entries(this.schema)
    }
  },
  methods: {
    updateModel(newValue, instanceData) {
      const { schema_name, binding } = instanceData
      console.warn('value updated, reemiting...')
      console.table({ newValue, binding })
      set(this.value, binding, newValue)
    }
  },
  data() {
    return {}
  }
}
</script>
