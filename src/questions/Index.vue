<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <p>Categories</p>
          </div>
          <div class="panel-body">
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-heading">Questions</div>
          <div class="panel-body">
            <QList @edit-item="editQuestion"></QList>
          </div>
        </div>
      </div>
      <div class="col-xs-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <p>Lists</p>
          </div>
          <div class="panel-body">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
          <SmartQuestion v-if="activeModel" v-model="activeModel"></SmartQuestion>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import QList from './QList.vue'
import Search from './Search.vue'
import { commit, sync } from 'vuex-pathify'
import SmartQuestion from './components/SmartQuestion.vue'
import FreeFormQuestion from './components/FreeFormQuestion.vue'
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion.vue'

import questionsList from './data/questionsList.js'

export default {
  name: 'Index',
  components: {
    QList,
    Search,
    SmartQuestion, // this one is functional and smart!
    FreeFormQuestion,
    MultipleChoiceQuestion
  },
  data() {
    return {
      questions: questionsList,
      SmartQuestion,
      activeModel: undefined
    }
  },
  methods: {
    // question param is actually a question model
    editQuestion(question) {
      this.$router.push({
        path: `/edit/${question.__id}`
      })
    }
  }
}
</script>
