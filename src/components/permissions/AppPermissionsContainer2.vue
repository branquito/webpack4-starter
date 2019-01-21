<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="">App Permissions 2</h2>
        <p class="lead">Manage here all your permissions</p>
      </div>
    </div><!-- row -->
    <div class="row buffer">
      <div class="col-md-12">
        <a @click="" class="btn btn-warning" href="#">Add new role</a>
      </div>
    </div>
    <div class="row col-md-12">
      <pre>
        {{ roles }}
      </pre>
    </div>
  </div><!-- container -->
</template>
<script>
import ProjectModule from './resources/Project.vue'
import GeneralModule from './resources/General.vue'
import VTab from '../tabs/VTab.vue'
import VTabs from '../tabs/VTabs.vue'
import { startCase } from 'lodash'
import data from './data/sample.json'
import merge from 'deepmerge'

export default {
  components: {
    ProjectModule,
    GeneralModule,
    VTabs,
    VTab
  },
  mounted() {
    this.parsePermissions()
  },
  data() {
    return {
      roles: data,
      resourceStatus: {
        isEditing: false,
        isRemoving: false
      }
    }
  },
  methods: {
    convertDotPathToNestedObject(path, value) {
      const [last, ...paths] = path.split('.').reverse()
      return paths.reduce((acc, el) => ({ [el]: acc }), { [last]: value })
    },
    parsePermissions() {
      const perms = this.roles.permissions
      const result = perms.reduce((acc, perm) => {
        return {
          ...acc,
          ...merge(acc, this.convertDotPathToNestedObject(perm.name, true))
        }
      }, {})
      console.warn({ perms: result })
    },
    uuid() {
      return this.$faker().random.uuid()
    },
    edit(id) {
      console.log('editing resource ', id)
      this.resourceStatus.isEditing = id
    },
    remove(id) {
      console.log('removing resource ', id)
      this.resourceStatus.isRemoving = id
      this.resourceStatus.isEditing = null
    },
    hf(value) {
      return startCase(value)
    }
  },
  computed: {
    resourceStyle() {
      return function(id) {
        return {
          'panel-info': id !== this.resourceStatus.isEditing,
          'panel-warning': id === this.resourceStatus.isEditing
          // "panel-danger": resource.id === this.resourceStatus.isRemoving
        }
      }
    }
  }
}
</script>
<style scoped>
.buffer {
  padding: 1em 0;
}
.animate {
  transition: width 0.2s ease-in-out;
}
</style>
