<template>
  <QuestionRenderless :value="value" @input="(model) => { $emit('input', model) }">
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
                <textarea v-model.lazy="Q.answer"></textarea>
              </div>
              <div class="col-xs-6"><pre>{{ Q }}</pre></div>
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
  name: 'FreeFormQuestion',
  components: { QuestionRenderless },
  mixins: [questionMixin]
}
</script>
<style lang="scss" scoped>
.buffer {
  margin-top: 0.5em;
}
</style>
