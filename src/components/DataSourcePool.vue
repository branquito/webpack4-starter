<template>
  <div>
    <input v-model="searchTerm" class="form-control" type="text" placeholder="Search...">
    <ul ref="pool" class="list-group">
      <template v-for="block in filteredItems">
        <div class="block-group" :id="block.group">
          <p class="group-name"><strong>{{ block.group }}</strong></p>
          <draggable
            :move="moveFn"
            :id="block.group"
            v-model="block.items"
            :options="options"
            class="drag-area"
            @start="$emit('start')"
            @end="$emit('end')"
            @change="$emit('list-altered')"
            >
            <li
              v-for="item in block.items"
              :key="item.item"
              class="list-group-item">
              {{ item.title }}
            </li>
          </draggable>
        </div>
      </template>
    </ul>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  props: {
    dataSource: {
      type: [Object, Array],
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    shaper: {
      // This should be transfomer functin used to shape data
      type: Function,
      required: false,
      default: value => {
        return value
      }
    },
    moveFn: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  created() {
    this.debouncedSearch = debounce(this.searchInPool, 300)
    if (this.dataSource) {
      this.init(this.dataSource, this.shaper)
    }
  },
  methods: {
    init(dataSource, shaper) {
      this.initialItems = shaper(dataSource)
      this.filteredItems = [...this.initialItems]
      this.$emit('data-init')
    },
    searchInPool() {
      let term = this.searchTerm
      this.filteredItems = this.initialItems.filter(block => {
        return (
          block.items.length === 0 ||
          block.items.some(dimension => {
            return dimension.title.toLowerCase().includes(term)
          })
        )
      })
    }
  },
  watch: {
    searchTerm: function(value) {
      this.debouncedSearch()
    },
    dataSource: function(value) {
      this.init(value, this.shaper)
    }
  },
  data() {
    return {
      searchTerm: '',
      initialItems: [],
      filteredItems: []
    }
  }
}
</script>
<style lang="scss" scoped>
.block-group {
  padding: 6px 6px;
  border: 1px solid lightgrey;
  margin: 2px 0;
}
.list-group {
  min-height: 140px;
  max-height: 440px;
  overflow-y: auto;
}
.group-name {
  padding: 0.6em 6px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
}
</style>
