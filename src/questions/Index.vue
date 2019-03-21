<template>
  <div class="container mx-auto mt-4">
    <div class="flex flex-wrap -mx-2 mb-4">
      <div class="w-full lg:w-1/5 mb-2 px-2">
        <h2 class="font-normal text-2xl m-2">Tags</h2>
        <div class="box-wrapper bg-grey-lighter border border-rn-grey-light p-3a text-xs">
          <pre class="debug text-rn-grey-dark">
             {{ lists }}
          </pre>
        </div>
      </div>
      <div class="w-full lg:w-2/5 mb-2 px-2">
        <h2 class="font-normal text-2xl m-2">Questions</h2>
        <div class="box-wrapper bg-rn-grey-lighter border border-rn-grey-light p-3a mb-3">
          <h4 class="font-medium">
            Create different types of questions
          </h4>
          <p class="text-sm my-2">Create or edit questions, choose the type, define suggested and preferred answers here.</p>
          <RnButton
            addon="add"
            theme="rn-default"
            is-rounded
            @click="addQuestionTemplate"
            class="mt-2">Add Question</RnButton>
        </div>

        <Search :source="questions" by="__id">
        <template slot="results" slot-scope="{results}">
          <pre>{{ results }}</pre>
        </template>
        </Search>
        <QList
          :items="questions"
          stack-name="QList"
          group-name="question-cards"
          @edit-item="editQuestionTemplate"
          @remove-item="removeQuestionTemplate"
          @drop="onDrop"
          ></QList>

      </div>
      <div class="w-full lg:w-2/5 px-2">
        <h2 class="font-normal text-2xl m-2">Question Lists</h2>
        <div class="box-wrapper bg-rn-grey-lighter border border-rn-grey-light p-3a mb-3">
          <h4 class="font-medium">Group questions into question lists</h4>
          <p class="text-sm my-2">Group your questions in lists that you can use for different Job reqs.</p>
          <RnButton
            addon="add"
            theme="rn-default"
            is-rounded
            @click="addNewList"
            class="mt-2"
            >Add List</RnButton>
        </div>
        <Search :source="[]" by="__id">
        <template slot="results" slot-scope="{results}">
          <pre>{{ results }}</pre>
        </template>
        </Search>
        <div v-for="list in lists" class="panel panel-default">
          <div class="">
            {{ list.name }}
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
import RnButton from './components/Button.vue'
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
    RnButton,
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
