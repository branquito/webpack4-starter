<template>
  <div>
    <h4>
      I am Index.vue in improvements
    </h4>
    <VButton
      @click="log"
      color="info"
      size="xs"
      faIcon="hammer"
      :confirmable="true"
      :style="{color: 'yellow'}"
      >
      <template v-slot:default>I am a Button</template>
      <p slot="loaderActions" slot-scope="{ startLoader, stopLoader }">
        <a @click.prevent="startLoader">start loader</a>
      </p>
    </VButton>
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
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 900)
      console.log('I was clicked!')
    }
  }
}
</script>
<style lang="scss">
</style>
