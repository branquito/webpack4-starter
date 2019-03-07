<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <p>categories</p>
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <p>questions</p>
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <p>lists</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <select id="" v-model="questionTypeModel">
          <option v-for="option in questions" :value="option.__type">{{ option.__type }}</option>
        </select>
      </div>
      <div class="col-md-12">
        <p></p>
        <pre>{{ selectedModel }}</pre>
      </div>
      <div class="col-md-12">
        <template v-for="( model, index ) in questions">
          <SmartQuestion v-model="model" :key="index"></SmartQuestion>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import QList from './QList.vue'
import Search from './Search.vue'
import { commit, sync } from 'vuex-pathify'
import QuestionFactory from './factories/QuestionFactory.js'
import SmartQuestion from './components/SmartQuestion.vue'
import FreeFormQuestion from './components/FreeFormQuestion.vue'
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion.vue'

export default {
  name: 'Index',
  components: {
    QList,
    Search,
    SmartQuestion,
    FreeFormQuestion,
    MultipleChoiceQuestion
  },
  data() {
    return {
      questionTypeModel: null,
      questions: [
        QuestionFactory.get('FreeFormQuestion', {
          question: 'My first freeform question'
        }),
        QuestionFactory.get('MultipleChoiceQuestion', {
          question: 'Choose one of the answers below',
          options: [
            {
              name: 'Choose me, I am the best'
            },
            {
              name: 'If you choose him, I will be sad'
            },
            {
              name: 'I am your final choice, choose me!'
            }
          ]
        })
      ],
      SmartQuestion
    }
  },
  computed: {
    selectedModel() {
      return this.questions.find(this.byModel)
    }
  },
  methods: {
    byModel(q) {
      return q.__type == this.questionTypeModel
    },
    addQuestion() {
      commit('questions/SET_QUESTIONS', this.question.question)
      this.question.question = ''
    }
  }
}
</script>
