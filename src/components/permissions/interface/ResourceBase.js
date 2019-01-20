import Vue from "vue"
const ResourceBase = Vue.extend({
  props: {
    resourceId: {
      type: Number,
      required: true
    },
    isEditing: {
      type: null
    },
    perms: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  computed: {
    editMode() {
      return this.resourceId === this.isEditing
    }
  }
})

export default ResourceBase
