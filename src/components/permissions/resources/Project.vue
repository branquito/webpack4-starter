<template>
  <div>
    <div v-if="editMode">
      <treeselect
        v-model="value"
        :multiple="true"
        :options="options"
        :showCount="true"
        :backspaceRemoves="false"
        :valueConsistsof="'ALL_WITH_INDETERMINATE'"
        ></treeselect>
    </div>
    <div v-else>{{ value }}</div>
  </div>
</template>
<script>
import ResourceBase from "../interface/ResourceBase"
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
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
