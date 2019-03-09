import Questions from "../Index.vue"
import SmartQuestion from "../components/SmartQuestion.vue"

import questionsList from "../data/questionsList.js"

export default [
  {
    path: "/",
    component: Questions,
    children: [
      {
        path: ":id/edit",
        component: SmartQuestion,
        props: route => {
          const modelFound = questionsList.find(
            q => q.__id === Number.parseInt(route.params.id)
          )
          return {
            questionModel: modelFound
          }
        }
      }
    ]
  }
]
