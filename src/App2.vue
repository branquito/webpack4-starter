<template>
  <v-tabs>
    <v-tab name="Tab 1">tab 1 content</v-tab>
    <v-tab name="Tab 2">tab 2 is slightly different</v-tab>
    <v-tab name="Tab 3">tab 3 is the last tab for now</v-tab>
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
