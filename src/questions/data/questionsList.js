import QuestionFactory from '../factories/QuestionFactory.js'

export default [
  QuestionFactory.get('FreeFormQuestion', {
    id: 1,
    question: 'My first freeform question'
  }),
  QuestionFactory.get('SingleChoiceQuestion', {
    id: 2,
    question: 'My 1st single choice question',
    options: [
      {
        id: 1,
        name: 'I am radio 1 option'
      },
      {
        id: 2,
        name: 'I am radio 2 option'
      },
      {
        id: 3,
        name: 'I am radio 3 option'
      }
    ]
  }),
  QuestionFactory.get('MultipleChoiceQuestion', {
    id: 3,
    usesOther: {
      sendOther: false,
      otherValue: ''
    }
  }),
  QuestionFactory.get('MultipleChoiceQuestion', {
    id: 4,
    question: 'Choose one of the answers below',
    options: [
      {
        id: 1,
        name: 'Choose me, I am the best'
      },
      {
        id: 2,
        name: 'If you choose him, I will be sad'
      },
      {
        id: 3,
        name: 'I am your final choice, choose me!'
      }
    ]
  })
]
