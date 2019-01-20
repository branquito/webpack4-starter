<template>
  <div>
    <div v-if="editMode">
      {{ perms }}
    </div>
  </div>
</template>
<script>
import ResourceBase from "../interface/ResourceBase"
export default ResourceBase.extend({})
</script>
