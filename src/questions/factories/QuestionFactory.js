import * as configurableFactory from './configurableFactory.js'

const QuestionFactory = configurableFactory.default.getInstance(
  'QuestionFactory'
)

/*
 * Types of questions;
 *   - FreeFormQuestion
 *   - MultipleChoiceQuestion
 *   - MultipleChoiceWithOtherQuestion
 *   - SingleChoiceQuestion
 *   - SingleChoiceWithOtherQuestion
 *   - YesNoQuestion
 */

QuestionFactory.addType('FreeFormQuestion', function createFreeFormQuestion({
  question = ''
} = {}) {
  return {
    question,
    answer: '',
    __type: 'FreeFormQuestion'
  }
})

QuestionFactory.addType(
  'MultipleChoiceQuestion',
  function multipleChoiceQuestion({ question = '', options = [] } = {}) {
    return {
      question,
      options,
      picked: [],
      specificRequired: false,
      __type: 'MultipleChoiceQuestion'
    }
  }
)

QuestionFactory.addType(
  'MultipleChoiceWithOtherQuestion',
  function createMultipleChoiceWithOtherQuestion({
    question = '',
    options = []
  } = {}) {
    return {
      question,
      options,
      picked: [],
      usesOther: false,
      other: '',
      specificRequired: false,
      __type: 'MultipleChoiceWithOtherQuestion'
    }
  }
)

QuestionFactory.addType(
  'SingleChoiceQuestion',
  function createSingleChoiceQuestion({ question = '', options = [] } = {}) {
    return {
      question,
      options,
      picked: '',
      specificRequired: false,
      __type: 'SingleChoiceQuestion'
    }
  }
)

QuestionFactory.addType(
  'SingleChoiceWithOtherQuestion',
  function createSingleChoiceWithOtherQuestion({
    question = '',
    options = []
  } = {}) {
    return {
      question,
      options,
      picked: '',
      usesOther: false,
      other: '',
      specificRequired: false,
      __type: 'SingleChoiceWithOtherQuestion'
    }
  }
)

QuestionFactory.addType('YesNoQuestion', function createYesNoQuestion({
  question = ''
} = {}) {
  return {
    question,
    options: ['Yes', 'No'],
    picked: '',
    specificRequired: false,
    __type: 'YesNoQuestion'
  }
})

export default QuestionFactory
