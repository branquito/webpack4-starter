<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="">App Permissions</h2>
        <p class="lead">Manage here all your permissions</p>
      </div>
    </div><!-- row -->
    <div class="row buffer">
      <div class="col-md-12">
        <a @click="addNewRole" class="btn btn-warning" href="#">Add new role</a>
      </div>
    </div>
    <div class="row col-md-12">
      <v-tabs v-if="r.length">
        <v-tab v-for="[ role, value ] in transformedRoles" :name="hf( role )" :key="value.id">
          <div class="row">
            <div v-for="{id, cmp, props} in value" class="animate" :class="[ id === resourceStatus.isEditing ? 'col-md-12' : 'col-md-4' ]">
              <div class="panel" :class="resourceStyle(id)">
                <div class="panel-heading clearfix">
                  {{ hf( cmp ) }}
                  <div class="pull-right">
                    <a @click="edit(id)" class="btn btn-default">
                      <span class="glyphicon glyphicon-pencil"></span>
                    </a>
                    <a @click="remove(id)" class="btn btn-default">
                      <span class="glyphicon glyphicon-trash"></span>
                    </a>
                  </div>
                </div>
                <div class="panel-body">
                  <component
                    :is="cmp + '-module'"
                    :resource-id="id"
                    :is-editing="resourceStatus.isEditing"
                    v-bind="props"
                    ></component>
                </div>
              </div>
            </div><!-- module -->
          </div><!-- row -->
        </v-tab>
      </v-tabs>
    </div>
  </div><!-- container -->
</template>
<script>
import ProjectModule from "./resources/Project.vue"
import GeneralModule from "./resources/General.vue"
import VTab from "../tabs/VTab.vue"
import VTabs from "../tabs/VTabs.vue"
import {startCase} from "lodash"

export default {
  components: {
    ProjectModule,
    GeneralModule,
    VTabs,
    VTab
  },
  mounted() {
    let fakeRoles = Array.from(new Array(6), this.createRandomRole)
    this.r = [...fakeRoles]
  },
  data() {
    return {
      resourceStatus: {
        isEditing: false,
        isRemoving: false
      },
      r: []
    }
  },
  methods: {
    uuid() {
      return this.$faker().random.uuid()
    },
    t(r) {
      return [Object.keys(r)[0], r[Object.keys(r)[0]]]
    },
    createRandomRole() {
      const rnd = Math.floor(Math.random() * 2)
      return {
        [this.$faker().name.jobTitle()]: [
          {
            id: this.$faker().random.number(),
            cmp: ["project", "project"][rnd],
            props: [
              {
                perms: [...this.randomPerms()]
              }
            ]
          }
        ]
      }
    },
    randomPerms() {
      return Array.from(new Array(3), () => {
        return {
          id: this.$faker().random.uuid(),
          label: this.$faker().lorem.word(),
          children: [
            {
              id: this.$faker().random.uuid(),
              label: "create"
            },
            {
              id: this.$faker().random.uuid(),
              label: "read"
            },
            {
              id: this.$faker().random.uuid(),
              label: "update"
            },
            {
              id: this.$faker().random.uuid(),
              label: "delete"
            }
          ]
        }
      })
    },
    edit(id) {
      console.log("editing resource ", id)
      this.resourceStatus.isEditing = id
    },
    remove(id) {
      console.log("removing resource ", id)
      this.resourceStatus.isRemoving = id
      this.resourceStatus.isEditing = null
    },
    addNewRole() {
      this.r.push(this.createRandomRole())
    },
    hf(value) {
      return startCase(value)
    }
  },
  computed: {
    transformedRoles() {
      return this.r.map(item => {
        return this.t(item)
      })
    },
    resourceStyle() {
      return function(id) {
        return {
          "panel-info": id !== this.resourceStatus.isEditing,
          "panel-warning": id === this.resourceStatus.isEditing
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
