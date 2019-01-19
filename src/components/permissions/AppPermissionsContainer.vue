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
      <v-tabs>
        <v-tab v-for="role in Object.keys(roles)" :name="hf( role )" :key="role">
          <div class="row">
            <div v-for="resource in roles[role]" class="animate" :class="[ resource.id === resourceStatus.isEditing ? 'col-md-8' : 'col-md-4' ]">
              <div class="panel" :class="resourceStyle(resource)">
                <div class="panel-heading clearfix">
                  {{ hf( resource.cmp ) }}
                  <div class="pull-right">
                    <a @click="edit(resource.id)" class="btn btn-default">
                      <span class="glyphicon glyphicon-pencil"></span>
                    </a>
                    <a @click="remove(resource.id)" class="btn btn-default">
                      <span class="glyphicon glyphicon-trash"></span>
                    </a>
                  </div>
                </div>
                <div class="panel-body">
                  <component :is="resource['cmp']+'-module'" v-bind="resource['props']"></component>
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
import InvoiceModule from "./resources/Invoice.vue"
import GeneralModule from "./resources/General.vue"
import VTab from "../tabs/VTab.vue"
import VTabs from "../tabs/VTabs.vue"
import {startCase} from "lodash"

export default {
  components: {
    ProjectModule,
    InvoiceModule,
    GeneralModule,
    VTabs,
    VTab
  },
  data() {
    return {
      resourceStatus: {
        isEditing: false,
        isRemoving: false
      },
      roles: {
        employee: [
          {id: 1, cmp: "project", props: [{perms: ["ruleTwo"]}]},
          {id: 2, cmp: "invoice", props: []}
        ],
        vendor: [
          {id: 3, cmp: "general", props: [{perms: ["ruleTwo", "ruleThree"]}]}
        ],
        contractor: [{id: 4, cmp: "project", props: [{perms: ["ruleOne"]}]}]
      }
    }
  },
  methods: {
    createRole() {
      return [
        {
          id: 5,
          cmp: "invoice",
          props: [{perms: ["ruleFour"]}]
        },
        {
          id: 6,
          cmp: "project",
          props: [{perms: ["ruleTwo"]}]
        }
      ]
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
      this.$set(this.roles, "new_role", this.createRole())
    },
    hf(value) {
      return startCase(value)
    }
  },
  computed: {
    resourceStyle() {
      return function(resource) {
        return {
          "panel-info": resource.id !== this.resourceStatus.isEditing,
          "panel-warning": resource.id === this.resourceStatus.isEditing
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
  transition: width 0.3s ease-in-out;
}
</style>
