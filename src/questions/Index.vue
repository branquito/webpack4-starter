<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <button @click="addQuestionToList('test question')">Add to list</button>
            <p>Categories</p>
            {{ lists }}
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
            <p>Lists</p>
          </div>
          <div class="panel-body">
            <QList
               :items="listItems"
               stack-name="Glist"
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
import FreeFormQuestion from './components/types/FreeFormQuestion.vue'
import SingleChoiceQuestion from './components/types/SingleChoiceQuestion.vue'
import MultipleChoiceQuestion from './components/types/MultipleChoiceQuestion.vue'
import YesNoQuestion from './components/types/YesNoQuestion.vue'
import { camelCase } from 'lodash'
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapGetters, createNamespacedHelpers } from 'vuex'

import { mapQuestionFields } from '../store'
const { mapMutations: mapQuestionMutations } = createNamespacedHelpers(
  'questions'
)
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
      show: false,
      listItems: []
    }
  },
  computed: {
    ...mapGetters('questions', { questions: 'items' }),
    ...mapQuestionFields(['lists'])
  },
  methods: {
    ...mapQuestionMutations({
      addQuestionToList: 'ADD_ITEM_TO_LIST'
    }),
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
          this.listItems = this.applyDrag(this.listItems, dropResult)
        }
      }
    },

    async addQuestionTemplate() {
      this.show = true
      await this.$store.dispatch('questions/storeModel', 'freeFormQuestion')
      this.$router.push({
        path: '/create/freeFormQuestion'
      })
    },

    removeQuestionTemplate(question) {
      this.$router.push({ path: '/' })
      this.$store.commit('questions/REMOVE_ITEM', question)
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
      this.$router.push({
        path: '/'
      })
      this.show = false
    }
  }
}
</script>
