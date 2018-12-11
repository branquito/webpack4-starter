<template>
  <div v-show="active" :id="hash">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    hash() {
      return `${this.name.toLowerCase().replace(/ /g, '-')}`
    }
  }
}
</script>
