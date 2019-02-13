<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <ul class="list-group">
          <template v-for="block in initialDraggableItems">
            <p class="group-name" :id="block.group"><strong>{{ block.group }}</strong></p>
            <draggable
              :move="moveFn"
              :id="block.group"
              v-model="block.dimensions"
              :options="{ group: 'groupA' }"
              class="drag-area selected-options groupA"
              @start="noop"
              @end="noop"
              >
              <li
              v-for="item in block.dimensions"
              :key="item.title"
              class="list-group-item">
                {{ item.title }}
              </li>
            </draggable>
          </template>
        </ul>
      </div>
      <div class="col-md-6">
        <pre>Selected items</pre>
        <ul class="list-group">
          <draggable
            v-model="selectedRows"
            :move="moveFn"
            id="rows"
            :options="{ group: 'groupA', filter: '.no-drag' }"
            :class="{ 'no-drag': !customize }"
            class="drag-area selected-options groupA"
            @start="noop"
            @end="noop"
            >
            <li
            v-for="item in selectedRows"
            :key="item.title"
            class="list-group-item">
              {{ item.title }} (group: <span class="group-label">{{ item.group }}</span>)
            </li>
          </draggable>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <pre>{{ response }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from "vuex"
import draggable from "vuedraggable"
import {has} from "lodash"
export default {
  name: "app3",
  components: {draggable},
  data() {
    return {
      user: null,
      customize: true,
      initialDraggableItems: [],
      selectedRows: [],
      moveFn: this.fnOnMove
    }
  },
  mounted() {
    this.user = this.$store.state.user
    this.getCube("Recruiting%20Counts")
    this.initialDraggableItems = this.initDraggableItems()
  },
  computed: {
    ...mapState(["response"])
  },
  methods: {
    ...mapActions(["getCube"]),
    noop() {},
    fnOnMove(event) {
      console.log({
        draggedContext: event.draggedContext,
        relatedContext: event.relatedContext,
        dragged: event.dragged,
        related: event.related
      })
      console.log({
        related_id: event.relatedContext.component.$el.getAttribute("id")
      })
      if (event.relatedContext.component.$el.getAttribute("id") === "rows")
        return true
      let fromGroup = event.draggedContext.element.group
      let toGroup = has(event.relatedContext, ["element", "group"])
        ? event.relatedContext.element.group
        : event.relatedContext.component.$el.getAttribute("id") !== fromGroup
          ? event.relatedContext.component.$el.getAttribute("id")
          : false
      console.log(fromGroup, toGroup)
      if (toGroup && fromGroup !== toGroup) return false
      return true
    },
    initDraggableItems() {
      return Object.entries(this.response.dimensions).map(([group, values]) => {
        return {
          group: group,
          dimensions: Object.entries(values).reduce((acc, [k, v]) => {
            return [
              ...acc,
              {
                item: k,
                title: v,
                group: group
              }
            ]
          }, [])
          // values: values
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.drag-area {
  min-height: 100px;
  background-color: lightgrey;
  padding: 0.3em 0.3em;
}
.list-group {
  max-height: 340px;
  overflow-y: scroll;
}
.group-name {
  padding: 1em 0;
}
.group-label {
  color: #bbb;
  font-style: italic;
}
</style>
