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
            <div v-if="value.options.length">
              <template v-for="option in value.options">
                <label>
                  {{ option.name }}
                  <input type="checkbox" v-model="value.picked" :value="option">
                </label>
              </template>
            </div>
            <div v-else>No options</div>
          </div>
          <div class="col-xs-6">Picked: <pre>{{ value.picked }}</pre></div>
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
  name: 'MultipleChoiceQuestion',
  mixins: [questionMixin]
}
</script>
