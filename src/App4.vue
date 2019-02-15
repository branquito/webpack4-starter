<template>
  <div class="container">
    <div class="panel panel-info">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4">
            <button
               @click="prepareRequestPayload"
               :disabled="disabled"
               class="btn btn-info">Generate
            </button>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="control-label">Select Data Source</label>
              <select v-model="cubeSelect" @change="selectCube" id="cubeSelect" class="form-control" name="cubeSelect">
                <option value="res1">Recruiting Counts</option>
                <option value="res2">Candidates Pipeline</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <input v-model="searchTerm" class="form-control" type="text" placeholder="Search...">
        <ul ref="pool" class="list-group">
          <template v-for="block in filteredDraggableItems">
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
                 @change="listAltered"
                 >
                 <li
                 v-for="item in block.dimensions"
                 :key="item.item"
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
            selected rows ( <strong>{{ selectedRows.length }}</strong> )
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
                @change="regroupItems('selectedRows')"
                >
                <li
                v-for="item in selectedRows"
                :data-group="item.group"
                :key="item.item"
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
          <div class="panel-heading">selected columns ( <strong>{{ selectedColumns.length }}</strong> )</div>
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
                @change="regroupItems('selectedColumns')"
                >
                <li
                v-for="item in selectedColumns"
                :data-group="item.group"
                :key="item.item"
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
import { debounce, has } from 'lodash'
import uniqid from 'uniqid'
import Mark from 'mark.js'
export default {
  name: 'app3',
  components: { draggable },
  data() {
    return {
      user: null,
      initialDraggableItems: [],
      filteredDraggableItems: [],
      selectedRows: [],
      selectedColumns: [],
      moveFn: this.fnOnMove,

      searchTerm: '',

      cubeSelect: 'res1',

      Mark: Mark,
      marker: null // Mark instance
    }
  },
  created() {
    this.debouncedSearch = debounce(this.searchInPool, 300)
  },
  mounted() {
    this.user = this.$store.state.user
    this.getCube('res1')
    this.initDraggableItems(this.cubeSelect)
    this.marker = new this.Mark(this.$refs.pool)
  },
  watch: {
    searchTerm: function(value) {
      this.debouncedSearch()
    }
  },
  computed: {
    ...mapState(['response']),
    disabled() {
      return !(this.selectedRows.length && this.selectedColumns.length)
    }
  },
  methods: {
    ...mapActions(['getCube']),
    searchInPool() {
      let term = this.searchTerm
      this.filteredDraggableItems = this.initialDraggableItems.filter(block => {
        return (
          block.dimensions.length === 0 ||
          block.dimensions.some(dimension => {
            return dimension.title.toLowerCase().includes(term)
          })
        )
      })
      this.marker.unmark()
      this.marker.mark(term, {
        // filter: function(node, term, totalCounter, counter) {
        //   return true
        // }
      })
    },
    regroupItems(colsOrRows) {
      let regrouped = this[colsOrRows].reduce((rv, x) => {
        ;(rv[x.group] = rv[x.group] || []).push(x)
        return rv
      }, {})
      let unfold = Object.keys(regrouped)
        .reduce((rv, group) => {
          rv.push(regrouped[group])
          return rv
        }, [])
        .flat()
      this[colsOrRows] = unfold
    },
    listAltered(e) {
      if (e.moved) {
        // swap back indexes, so that element stays in same position
        this.preventSwap(e)
      }
    },
    preventSwap(e) {
      let { oldIndex, newIndex, element } = e.moved
      let foundAt = this.findElementById(element.id)
      let replaceSubject = this.initialDraggableItems[foundAt]
      let replacement = { ...replaceSubject }

      // re-swap items
      replacement.dimensions[oldIndex] = replacement.dimensions.splice(
        newIndex,
        1,
        replacement.dimensions[oldIndex]
      )[0]
      this.initialDraggableItems.splice(foundAt, 1, replacement)
    },
    findElementById(id) {
      return this.initialDraggableItems.findIndex(draggable => {
        return draggable.dimensions.some(dimension => {
          return dimension.id === id
        })
      })
    },
    findTargetGroupInPool(e) {
      const pool = this.$refs.pool.querySelector(`[id='${e.item.dataset.group}']`)
      if (!pool) return
      pool.scrollIntoView({
        // behavior: 'smooth',
        block: 'start'
      })
      pool.style.backgroundColor = '#ffffe0'
      pool.style.border = '2px dotted red'
    },
    fnOnMove(e) {
      let { relatedContext, draggedContext, dragged, related } = e

      // Allow 'rows' & 'cols' to act as drop targets
      if (['rows', 'cols'].includes(relatedContext.component.$el.getAttribute('id'))) return true
      let fromGroup = draggedContext.element.group
      let toGroup = has(relatedContext, ['element', 'group'])
        ? relatedContext.element.group
        : relatedContext.component.$el.getAttribute('id') !== fromGroup
          ? relatedContext.component.$el.getAttribute('id')
          : false

      if (toGroup && fromGroup !== toGroup) return false
      return true
    },
    unapplyStyles(e) {
      const pool = this.$refs.pool.querySelector(`[id='${e.item.dataset.group}']`)
      if (!pool) return
      pool.style.backgroundColor = ''
      pool.style.border = ''
    },
    prepareRequestPayload() {
      console.log('preparing request payload...')
      let rows = this.prepareSet('selectedRows')
      let columns = this.prepareSet('selectedColumns')
      console.log({ rows, columns })
    },
    prepareSet(colsOrRows) {
      return this[colsOrRows].reduce((rv, item) => {
        rv = {
          ...rv,
          [item.item]: item.title
        }
        return rv
      }, {})
    },
    selectCube() {
      this.initialDraggableItems = this.initDraggableItems(this.cubeSelect)
    },
    initDraggableItems(cube) {
      this.initialDraggableItems = Object.entries(this.response[cube].dimensions).map(([group, values]) => {
        return {
          group,
          dimensions: Object.entries(values).reduce((acc, [k, v]) => {
            return [
              ...acc,
              {
                item: k,
                title: v,
                group: group,
                id: uniqid()
              }
            ]
          }, [])
          // values: values
        }
      })
      this.filteredDraggableItems = this.initialDraggableItems
      // reset selected rows & cols
      this.selectedRows = this.selectedColumns = []
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
