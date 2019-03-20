<template>
  <div class="container mx-auto">
    <div class="flex flex-row -mx-2 mb-4">
      <div class="flex-1 max-w-xs px-2">
        <div class="box-wrapper bg-grey-lighter border border-rn-grey-light p-3a text-xs">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="font-medium">Categories</h4>
            </div>
            <div class="panel-body">
              <pre class="debug text-rn-grey-dark">
                {{ lists }}
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 px-2">
        <div class="box-wrapper bg-rn-grey-lighter border border-rn-grey-light p-3a">
          <div class="panel panel-default">
            <div class="panel-heading clearfix">
              <h4 class="font-medium">
                Create different types of questions
              </h4>
              <p>Create or edit questions, choose the type, define suggested and preferred answers here.</p>
              <button
                @click="addQuestionTemplate"
                class="border border-rn-teal-darker bg-rn-teal-darker px-3 py-2 text-white text-xs">Add Question
              </button>
            </div>
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
      </div>
      <div class="flex-1 px-2">
        <div class="box-wrapper bg-rn-grey-lighter border border-rn-grey-light p-3a">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="font-medium">Group questions into question lists</h4>
              <button @click="addNewList"
                class="border border-rn-teal-darker bg-rn-teal-darker px-3 py-2 text-white text-xs">Add List
              </button>
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
      addNewList: 'addList',
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

          if (foundListModel) {
            let list = [...foundListModel.questions]
            list = this.applyDrag(list, dropResult)

            this.setQuestionList({ foundListModel, list })
          }
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
    }
  }
}
</script>
<style lang="scss">
.debug {
}
</style>
