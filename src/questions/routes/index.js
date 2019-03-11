import Questions from '../Index.vue'
import SmartQuestion from '../components/SmartQuestion.vue'

import store from '../../store/index.js'
import QuestionFactory from '../factories/QuestionFactory.js'

export default [
  {
    path: '/',
    component: Questions,
    children: [
      {
        path: 'create',
        component: SmartQuestion,
        props: route => {
          return {
            questionTypes: QuestionFactory.getAllTypes(true),
            questionModel: QuestionFactory.get(route.query.type)
          }
        }
      },
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
