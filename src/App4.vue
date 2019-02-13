<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <ul ref="pool" class="list-group">
          <template v-for="block in initialDraggableItems">
            <div class="block-group" :id="block.group">
              <p class="group-name"><strong>{{ block.group }}</strong></p>
              <draggable
                 :move="moveFn"
                 :id="block.group"
                 v-model="block.dimensions"
                 :options="{ group: 'groupA' }"
                 class="drag-area"
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
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            selected rows
          </div>
          <div class="panel-body">
            <ul class="list-group">
              <draggable
                v-model="selectedRows"
                :move="moveFn"
                id="rows"
                :options="{ group: 'groupA' }"
                class="drag-area"
                @start="findTargetGroupInPool"
                @end="unapplyStyles"
                >
                <li
                v-for="item in selectedRows"
                :data-group="item.group"
                :key="item.title"
                class="list-group-item">
                  {{ item.title }} <span class="label label-danger">{{ item.group }}</span>
                </li>
              </draggable>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">selected columns</div>
          <div class="panel-body">
            <ul class="list-group">
              <draggable
                v-model="selectedColumns"
                :move="moveFn"
                id="cols"
                :options="{ group: 'groupA' }"
                class="drag-area"
                @start="findTargetGroupInPool"
                @end="unapplyStyles"
                >
                <li
                v-for="item in selectedColumns"
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
      initialDraggableItems: [],
      selectedRows: [],
      selectedColumns: [],
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
    findTargetGroupInPool(event) {
      console.log({ targetGroup: event.item.dataset.group })
      const pool = this.$refs.pool.querySelector(`[id='${event.item.dataset.group}']`)
      pool.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      pool.style.backgroundColor = '#ffffe0'
      pool.style.border = '2px dotted red'
    },
    fnOnMove(event) {
      console.log({
        related_id: event.relatedContext.component.$el.getAttribute('id')
      })

      let { relatedContext, draggedContext, dragged, related } = event

      console.log({
        draggedContext,
        relatedContext,
        dragged,
        related
      })

      if (['rows', 'cols'].includes(relatedContext.component.$el.getAttribute('id'))) return true
      let fromGroup = draggedContext.element.group
      let toGroup = has(relatedContext, ['element', 'group'])
        ? relatedContext.element.group
        : relatedContext.component.$el.getAttribute('id') !== fromGroup
          ? relatedContext.component.$el.getAttribute('id')
          : false

      console.log({ fromGroup, toGroup })
      if (toGroup && fromGroup !== toGroup) return false
      return true
    },
    unapplyStyles(event) {
      const pool = this.$refs.pool.querySelector(`[id='${event.item.dataset.group}']`)
      pool.style.backgroundColor = ''
      pool.style.border = ''
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
    },
    noop() {}
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
  font-weight: normal;
}
</style>
