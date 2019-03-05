<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4">
        <Search
          :label="'Search in Categories'"
          :source="[{id: 1, text: 'one'}, {id: 2, text: 'two'}]"
          >
          <template slot="results" slot-scope="{results}">
            <pre>{{ results }}</pre>
          </template>
        </Search>
        <div class="panel panel-default">
          <div class="panel-body">
            <p>categories</p>
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <Search
          :source="[{id: 1, text: 'one'}, {id: 2, text: 'two'}]">
          <template slot="results" slot-scope="{results}">
            <pre>{{ results }}</pre>
          </template>
        </Search>
        <div class="panel panel-default">
          <div class="panel-body">
            <p>questions</p>
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <Search :source="[{id: 1, text: 'one'}, {id: 2, text: 'two'}]"></Search>
        <div class="panel panel-default">
          <div class="panel-body">
            <p>lists</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QList from './QList.vue'
import Search from './Search.vue'
export default {
  components: { QList, Search }
}
</script>
