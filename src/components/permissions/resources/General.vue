<template>
  <div>
    {{ perms }}
  </div>
</template>
<script>
export default {
  props: {
    perms: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  }
}
</script>
