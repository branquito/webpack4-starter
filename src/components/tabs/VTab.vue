<template>
  <div class="panel panel-default" v-show="active" :id="hash">
    <div class="panel-body">
      <slot />
    </div>
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
      return `${this.name.toLowerCase().replace(/ /g, "-")}`
    }
  }
}
</script>
<style scoped>
.panel-default {
  border: none;
}
.panel-body {
  min-height: 250px;
}
</style>
