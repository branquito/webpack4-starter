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
          <div class="panel-heading clearfix">Questions
            <button @click="addQuestionTemplate" class="btn btn-default pull-right">
              <i class="glyphicon glyphicon-plus"></i>
            </button></div>
          <div class="panel-body">
            <QList
              :items="questions"
              @edit-item="editQuestionTemplate"
              @remove-item="removeQuestionTemplate"
              ></QList>
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
    <modal :show="show" @close="close">
      <router-view @load-type="loadQuestionTemplate" @modal-close="show = false"></router-view>
    </modal>
  </div>
</template>
<script>
import Vue from 'vue'
import Modal from './Modal.vue'
import QList from './QList.vue'
import Search from './Search.vue'
import FreeFormQuestion from './components/types/FreeFormQuestion.vue'
import SingleChoiceQuestion from './components/types/SingleChoiceQuestion.vue'
import MultipleChoiceQuestion from './components/types/MultipleChoiceQuestion.vue'
import YesNoQuestion from './components/types/YesNoQuestion.vue'
import { commit, get } from 'vuex-pathify'
import { camelCase } from 'lodash'
export default {
  name: 'Index',
  components: {
    QList,
    Search,
    FreeFormQuestion,
    SingleChoiceQuestion,
    MultipleChoiceQuestion,
    YesNoQuestion,
    Modal
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    questions: get('questions/items')
  },
  methods: {
    async addQuestionTemplate() {
      this.show = true
      await this.$store.dispatch('questions/storeModel', 'freeFormQuestion')
      this.$router.push({
        path: '/create/freeFormQuestion'
      })
    },
    removeQuestionTemplate(question) {
      this.$router.push({ path: '/' })
      commit('questions/REMOVE_ITEM', question)
    },
    /*
     * loading question template based on selected type from <select />
     */
    loadQuestionTemplate(type) {
      this.$store.dispatch('questions/storeModel', camelCase(type))
      this.$router.push({
        path: `/create/${camelCase(type)}`
      })
    },
    /*
     *  @param question Question type model
     *  @void
     */
    editQuestionTemplate(question) {
      this.show = true
      this.$router.push({
        path: `/${question.__id}/edit`
      })
    },
    close() {
      this.show = false
    }
  }
}
</script>
