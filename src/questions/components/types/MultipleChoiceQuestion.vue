<template>
  <QuestionRenderless :questionModel="questionModel" @input="(model) => { $emit('input', model) }">
  <template slot-scope="{data: Q, addOption}">
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
              <p>Question: {{ Q.question }}</p>
              <div class="input-group">
                <input class="form-control" type="text" v-model="optionName">
                <span class="input-group-btn">
                  <button
                    :disabled="optionName === ''"
                    @click.prevent="addOption({name: `option ${optionName}`})"
                    class="btn btn-default">+</button>
                </span>
              </div><!-- /input-group -->
              <div v-if="hasOptions">
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
  name: 'MultipleChoiceQuestion',
  components: { QuestionRenderless, QuestionTypeSelect },
  mixins: [questionMixin],
  data() {
    return {
      optionName: ''
    }
  }
}
</script>
