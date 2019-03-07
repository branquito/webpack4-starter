import * as configurableFactory from './configurableFactory.js'

const QuestionFactory = configurableFactory.default.getInstance(
  'QuestionFactory'
)

/*
 * Types of questions;
 *   - FreeFormQuestion
 *   - MultipleChoiceQuestion /with OTHER
 *   - SingleChoiceQuestion /with OTHER
 *   - YesNoQuestion
 */

QuestionFactory.addType('FreeFormQuestion', function createFreeFormQuestion({
  question = ''
} = {}) {
  return {
    question,
    answer: '',
    __cmp: 'FreeFormQuestion',
    __type: 'FreeFormQuestion'
  }
})

QuestionFactory.addType(
  'MultipleChoiceQuestion',
  function multipleChoiceQuestion({
    question = '',
    options = [],
    usesOther = undefined
  } = {}) {
    return {
      question,
      options,
      picked: [],
      specificRequired: false,
      __cmp: 'MultipleChoiceQuestion',
      __type: `MultipleChoiceQuestion${(usesOther && 'Other') || ''}`,
      ...usesOther
    }
  }
)

QuestionFactory.addType(
  'SingleChoiceQuestion',
  function createSingleChoiceQuestion({
    question = '',
    options = [],
    usesOther = undefined
  } = {}) {
    return {
      question,
      options,
      picked: '',
      specificRequired: false,
      __cmp: 'SingleChoiceQuestion',
      __type: `SingleChoiceQuestion${(usesOther && 'Other') || ''}`,
      ...usesOther
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
    __cmp: 'YesNoQuestion',
    __type: 'YesNoQuestion'
  }
})

export default QuestionFactory
