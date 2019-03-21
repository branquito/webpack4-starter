<template>
  <div class="search-box">
    <div class="form-group">
        <label>
          {{ label }}
          <input v-model="term" placeholder="Search..." class="border rounded rounded-sm leading-normal" type="text">
        </label>
      </div>
    <slot name="results" v-bind="{ results }"></slot>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'Search',
  props: {
    label: {
      type: String,
      default: ''
    },
    source: {
      type: Array,
      required: true
    },
    by: {
      type: String,
      required: false,
      default: 'id'
    }
  },
  created() {
    this.debounceSearch = _.debounce(this.search, 400)
  },
  data() {
    return {
      term: '',
      results: []
    }
  },
  methods: {
    search() {
      console.log(`Searching... for ${this.term}`)
      if (this.source.length && this.source[0][this.by]) {
        this.results = this.source
          .filter(
            entry =>
              this.term !== '' && entry[this.by].indexOf(this.term) !== -1
          )
          .map(entry => entry[this.by])
      } else {
        console.warn(
          `${
            this.by
          } not found in searchable items. Did you specify the key to search on?`
        )
      }
    }
  },
  watch: {
    term: {
      handler() {
        this.debounceSearch()
      }
    }
  }
}
</script>
