<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <ul ref="pool" class="list-group">
          <template v-for="block in initialDraggableItems">
            <div class="block-group" :id="block.group">
              <p class="group-name"><strong>{{ block.group }}</strong></p>
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
            </div>
          </template>
        </ul>
      </div>
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">
            <pre>Selected items</pre>
          </div>
          <div class="panel-body">
            <ul class="list-group">
              <draggable
                v-model="selectedRows"
                :move="moveFn"
                id="rows"
                :options="{ group: 'groupA', filter: '.no-drag' }"
                :class="{ 'no-drag': !customize }"
                class="drag-area selected-options groupA"
                @start="findTargetGroup"
                @end="unapplyStyles"
                >
                <li
                v-for="item in selectedRows"
                :data-group="item.group"
                :key="item.title"
                class="list-group-item">
                  {{ item.title }} <span class="label label-danger"><small>{{ item.group }}</small></span>
                </li>
              </draggable>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!-- <pre>{{ response }}</pre> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { has } from 'lodash'
export default {
  name: 'app3',
  components: { draggable },
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
    this.getCube('Recruiting%20Counts')
    this.initialDraggableItems = this.initDraggableItems()
  },
  computed: {
    ...mapState(['response'])
  },
  methods: {
    ...mapActions(['getCube']),
    noop() {},
    unapplyStyles(event) {
      const poolTarget = this.$refs.pool.querySelector(`[id='${event.item.dataset.group}']`)
      poolTarget.style.backgroundColor = ''
      poolTarget.style.border = ''
    },
    findTargetGroup(event) {
      console.log({ targetGroup: event.item.dataset.group })
      const poolTarget = this.$refs.pool.querySelector(`[id='${event.item.dataset.group}']`)
      poolTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      poolTarget.style.backgroundColor = '#ffffe0'
      poolTarget.style.border = '3px solid red'
    },
    fnOnMove(event) {
      console.log({
        draggedContext: event.draggedContext,
        relatedContext: event.relatedContext,
        dragged: event.dragged,
        related: event.related
      })
      console.log({
        related_id: event.relatedContext.component.$el.getAttribute('id')
      })
      if (event.relatedContext.component.$el.getAttribute('id') === 'rows') return true
      let fromGroup = event.draggedContext.element.group
      let toGroup = has(event.relatedContext, ['element', 'group'])
        ? event.relatedContext.element.group
        : event.relatedContext.component.$el.getAttribute('id') !== fromGroup
          ? event.relatedContext.component.$el.getAttribute('id')
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
  padding: 0.3em 0.3em;
}
.list-group {
  min-height: 140px;
  max-height: 440px;
  overflow-y: auto;
}
.block-group {
  padding: 6px 6px;
  border: 1px solid lightgrey;
  margin: 2px 0;
}
.group-name {
  padding: 0.6em 6px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.label {
  font-size: 9px !important;
}
</style>
