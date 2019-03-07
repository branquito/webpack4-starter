<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <p>{{ cmpName }}</p>
    </div>
    <div class="panel-body">
      <form @submit.prevent="submit">
        <div class="row">
          <div class="col-xs-6">
            <p>Q: {{ value.question }}</p>
            <textarea v-model.lazy="value.answer"></textarea>
          </div>
          <div class="col-xs-6"><pre>{{ value }}</pre></div>
        </div>
        <div class="row buffer">
          <div class="col-md-12">
            <button type="submit" class="btn btn-warning">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import questionMixin from './mixins/questionMixin.vue'
export default {
  name: 'FreeFormQuestion',
  mixins: [questionMixin]
}
</script>
<style lang="scss" scoped>
.buffer {
  margin-top: 0.5em;
}
</style>
