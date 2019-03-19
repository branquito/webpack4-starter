<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <p>Categories</p>
            <pre>
            {{ lists }}
            </pre>
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
              stack-name="QList"
              group-name="question-cards"
              @edit-item="editQuestionTemplate"
              @remove-item="removeQuestionTemplate"
              @drop="onDrop"
              ></QList>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <button @click="addList" class="btn btn-default pull-right">
              <i class="glyphicon glyphicon-plus"></i>
            </button>
            <p>Lists</p>
          </div>
          <div class="panel-body">
            <div v-for="list in lists" class="panel panel-default">
              <div class="panel-heading">{{ list.name }}</div>
              <div class="panel-body">
                <QList
                   :items="list.questions"
                   :stack-name="list.name"
                   group-name="question-cards"
                   @drop="onDrop"
                   ></QList>
              </div>
            </div>
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
import { camelCase } from 'lodash'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters, createNamespacedHelpers } from 'vuex'

import { mapQuestionFields, mapQuestionListFields } from '../store'

const { mapMutations: mapQuestionMutations } = createNamespacedHelpers(
  'questions'
)
const { mapMutations: mapQuestionListMutations } = createNamespacedHelpers(
  'questions/lists'
)
const { mapActions: mapQuestionActions } = createNamespacedHelpers('questions')

export default {
  name: 'Index',
  components: {
    QList,
    Search,
    FreeFormQuestion,
    SingleChoiceQuestion,
    MultipleChoiceQuestion,
    YesNoQuestion,
    Modal,
    Container,
    Draggable
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters('questions', { questions: 'items' }),
    ...mapQuestionListFields({ lists: 'items' })
  },
  methods: {
    ...mapQuestionMutations({
      removeQuestion: 'remove'
    }),
    ...mapQuestionListMutations({
      addQuestionToList: 'addItemToList',
      setQuestionList: 'setList'
    }),
    ...mapQuestionActions(['storeModel', 'cancel', 'saveItem', 'updateItem']),
    applyDrag(items, dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult
      if (removedIndex === null && addedIndex === null) return items

      const result = [...items]
      let itemToAdd = payload

      const exists = items.some(item => item.__id === payload.__id)
      if (exists) {
        alert(`same id already in use ${payload.__id}`)
        return result
      }

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd) // Add child at this specific index
      }
      return result
    },

    onDrop(source, ...args) {
      const dropResult = args[0]
      if (source === 'Qlist') return false
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        if (dropResult.removedIndex === null) {
          const foundListModel = this.lists.find(list => list.name === source)

          let list = [...foundListModel.questions]
          list = this.applyDrag(list, dropResult)

          this.setQuestionList({ foundListModel, list })
        }
      }
    },

    async addQuestionTemplate() {
      this.show = true
      await this.storeModel('freeFormQuestion')
      this.$router.push({
        path: '/create/freeFormQuestion'
      })
    },

    removeQuestionTemplate(question) {
      this.$router.push({ path: '/' })
      this.removeQuestion(question)
    },

    /*
     * loading question template based on selected type from <select />
     */
    loadQuestionTemplate(type) {
      this.storeModel(camelCase(type))
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
      this.$router.push({
        path: '/'
      })
      this.show = false
    },

    addList() {
      this.addQuestionToList()
    }
  }
}
</script>
