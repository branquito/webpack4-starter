<template>
  <div v-if="editMode">
    <treeselect v-model="value" :multiple="true" :options="options"></treeselect>
  </div>
  <div v-else>{{ value }}</div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import ResourceBase from "../interface/ResourceBase"
export default ResourceBase.extend({
  components: {Treeselect},
  data() {
    return {
      value: null, // holds the treeselect value
      options: this.perms
    }
  }
})
</script>
