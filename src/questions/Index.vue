<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <p>Categories</p>
          </div>
          <div class="panel-body">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">Questions</div>
          <div class="panel-body">
            <QList @edit-item="editQuestion"></QList>
          </div>
        </div>
      </div>
      <div class="col-md-4">
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
        <div class="panel panel-warning">
          <div class="panel-heading">Edit question:</div>
          <div class="panel-body">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import QList from "./QList.vue"
import Search from "./Search.vue"
import FreeFormQuestion from "./components/FreeFormQuestion.vue"
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion.vue"

export default {
  name: "Index",
  components: {
    QList,
    Search,
    FreeFormQuestion,
    MultipleChoiceQuestion
  },
  data() {
    return {}
  },
  methods: {
    // question param is actually a question model
    editQuestion(question) {
      this.$router.push({
        path: `/${question.__id}/edit`
      })
    }
  }
}
</script>
