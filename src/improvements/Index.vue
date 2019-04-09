<template>
  <div>
    <h4>
      I am Index.vue in improvements
    </h4>
    <VButton
      color="info"
      size="lg"
      @click="log"
      :style="{color: 'yellow'}"
      :loading="loading"
      >Test button</VButton>
  </div>
</template>
<script>
import VButton from './components/Button.vue'

export default {
  name: 'Index',
  components: { VButton },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    log() {
      console.log('I was clicked!')
    }
  }
}
</script>
