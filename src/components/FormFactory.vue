<template>
  <div>
    <slot></slot> <!-- Useful when you want some custom component out of form creation logic -->
    <template v-for="control in controls">
      <el-factory
        :control="control"
        :model="value"
        @input="updateModel"
        @submit="reemit(...arguments)"
        ></el-factory>
    </template>
  </div>
</template>

<script>
import elFactory from './functional/elFactory.vue'
import { set, isObject } from 'lodash'
export default {
  components: { elFactory },
  provide: {
    themes: {
      bootstrap: {
        input: 'form-control',
        button: 'btn btn-primary',
        dropdown: 'dropdown'
      }
    },
    theme: 'bootstrap'
  },
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
    reemit(...args) {
      this.$emit('submit', ...args)
    },
    updateModel(newValue, instanceData) {
      const { ctrlName, binding } = instanceData
      console.log({ newValue, binding })
      // console.log({ ctrlName })
      set(this.value, binding, newValue)
    }
  }
}
</script>
