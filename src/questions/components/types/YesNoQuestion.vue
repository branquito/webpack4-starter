<template>
  <QuestionRenderless :questionModel="questionModel" @input="(model) => { $emit('input', model)}">
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
      </div>
      <div class="panel-body">
        <form @submit.prevent="submit">
          <div class="row">
            <div class="col-xs-6">
              <p>Question: {{ Q.question }}</p>

              <div v-if="hasOptions">
                <template v-for="option in Q.options">
                  <p>
                    <label>
                      {{ option.name }}
                      <input type="radio" v-model="Q.picked" :value="option" name="yesno">
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
    </template>
  </QuestionRenderless>
</template>
<script>
import QuestionTypeSelect from '../QuestionTypeSelect.vue'
import questionMixin from '../mixins/questionMixin.vue'
import QuestionRenderless from '../QuestionRenderless.vue'
export default {
  name: 'YesNoQuestion',
  components: { QuestionRenderless, QuestionTypeSelect },
  mixins: [questionMixin]
}
</script>
