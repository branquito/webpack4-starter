<template>
  <ul>
    <li v-for="control in controls">{{ control }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    frmModel: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    controls() {
      return Object.entries(this.frmModel)
    }
  },
  data() {
    return {}
  }
}
</script>
