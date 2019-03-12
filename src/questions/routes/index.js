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
      // Creating Question Type
      {
        path: 'create/:type',
        component: SmartQuestion,
        props: route => {
          let newModel = QuestionFactory.get(route.params.type)
          return {
            questionTypes: QuestionFactory.getAllTypes(true), // true is for Human Case
            questionModel: newModel
          }
        }
      },
      // Editing Question Type
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
