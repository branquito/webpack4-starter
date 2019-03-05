<template>
  <div class="search-box">
    <div class="form-group">
        <label>
          {{ label }}
          <input v-model="term" placeholder="Search..." class="form-control" type="text">
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
      default: 'Search here'
    },
    source: {
      type: Array,
      required: true
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
      this.results = this.source.filter(
        entry => this.term !== '' && entry.text.indexOf(this.term) !== -1
      )
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
