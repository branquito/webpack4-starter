<template>
  <v-tabs>
    <v-tab></v-tab>
    <v-tab></v-tab>
    <v-tab></v-tab>
  </v-tabs>
</template>
<script>
import VTabs from './components/tabs/VTabs.vue'
import VTab from './components/tabs/VTab.vue'
export default {
  name: 'app2',
  components: { VTabs, VTab },
  data() {
    return {
      message: 'hello Vue!'
    }
  },
  methods: {}
}
</script>
