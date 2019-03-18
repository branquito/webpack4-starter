import Questions from '../Index.vue'
import SmartQuestion from '../components/SmartQuestion.vue'

import store from '../../store/index.js'
import QuestionFactory from '../factories/QuestionFactory.js'
import QuestionTypeSelect from '../components/QuestionTypeSelect.vue'

export default [
  {
    path: '/',
    component: Questions,
    children: [
      // Question Type CREATE
      {
        path: 'create/:type',
        component: SmartQuestion,
        props: route => {
          return {
            questionTypes: QuestionFactory.getAllTypes(true), // true is for Human Case
            questionModel: store.getters['questions/getModel']
          }
        }
      },
      // Question Type EDIT
      {
        path: ':id/edit',
        component: SmartQuestion,
        props: route => {
          const modelFound = store.getters['questions/items'].find(
            q => q.__id.toString() === route.params.id
          )
          return {
            questionModel: modelFound
          }
        }
      }
    ]
  }
]
