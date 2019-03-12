<template>
  <QuestionRenderless :question-model="questionModel" @change="(model) => { $emit('change', model) }">
    <template slot-scope="{data: Q}">
    <QuestionTypeSelect
          v-if="mode === 'create'"
          :get-selected="getActiveQuestionTypeSelection"
          :types="questionTypes"
          @load-type="$emit('load-type', $event)"
          >
    </QuestionTypeSelect>
      <div class="panel panel-default">
        <div class="panel-heading">
          <p>{{ cmpName }} in <strong>{{ mode }}</strong> mode</p>
        </div>
        <div class="panel-body">
          <form @submit.prevent="submit">
            <div class="row">
              <div class="col-xs-6">
                <input class="form-control" type="text" v-model="Q.question">
                <textarea class="form-control" v-model="Q.answer"></textarea>
              </div>
              <div class="col-xs-6"><pre>{{ Q }}</pre></div>
            </div>
            <div class="row buffer">
              <div class="col-md-12">
                <button type="submit" class="btn btn-warning">{{ buttonText }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
  </QuestionRenderless>
</template>
<script>
import QuestionTypeSelect from '../QuestionTypeSelect.vue'
import questionMixin from '../mixins/questionMixin.vue'
import QuestionRenderless from '../QuestionRenderless.vue'
export default {
  name: 'FreeFormQuestion',
  components: { QuestionRenderless, QuestionTypeSelect },
  mixins: [questionMixin]
}
</script>
<style lang="scss" scoped>
.buffer {
  margin-top: 0.5em;
}
</style>
