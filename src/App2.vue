<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <v-tabs>
          <v-tab name="Tab 1">
            <p>
              Sit laudantium impedit modi aperiam voluptatibus eaque nesciunt Est repudiandae.</p>
          </v-tab>
          <v-tab name="Tab 2"><p>
              Ipsum consequuntur minus ullam aliquid officia? Aperiam minima cumque voluptates.</p>
          </v-tab>
          <v-tab name="Tab 3">
            <p>
              Adipisicing quasi aut nostrum commodi velit Dolores culpa non vitae.
            </p>
          </v-tab>
        </v-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import VTabs from "./components/tabs/VTabs.vue"
import VTab from "./components/tabs/VTab.vue"
export default {
  name: "app2",
  components: {VTabs, VTab},
  data() {
    return {
      message: "hello Vue!"
    }
  },
  methods: {}
}
</script>
