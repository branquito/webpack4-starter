<template>
  <QuestionRenderless :questionModel="questionModel" @input="(model) => { $emit('input', model) }">
  <template slot-scope="{data: Q}">
    <div class="panel panel-default">
      <div class="panel-heading">
        <p>{{ cmpName }}</p>
      </div>
      <div class="panel-body">
        <form @submit.prevent="submit">
          <div class="row">
            <div class="col-xs-6">
              <p>Q: {{ Q.question }}</p>
              <div v-if="Q.options.length">
                <template v-for="option in Q.options">
                  <p>
                    <label>
                      {{ option.name }}
                      <input type="checkbox" v-model="Q.picked" :value="option">
                    </label>
                  </p>
                </template>
              </div>
              <div v-else>No options</div>
            </div>
            <div class="col-xs-6">Picked: <pre>{{ Q.picked }}</pre></div>
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
  </QuestionRenderless>
</template>
<script>
import questionMixin from './mixins/questionMixin.vue'
import QuestionRenderless from './QuestionRenderless.vue'
export default {
  name: 'MultipleChoiceQuestion',
  components: { QuestionRenderless },
  mixins: [questionMixin]
}
</script>
