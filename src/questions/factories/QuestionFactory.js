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
  question = '',
  id = null
} = {}) {
  return {
    question,
    answer: '',
    __cmp: 'FreeFormQuestion',
    __type: 'FreeFormQuestion',
    __id: id
  }
})

QuestionFactory.addType(
  'MultipleChoiceQuestion',
  function createMultipleChoiceQuestion({
    id = null,
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
      __id: id,
      ...usesOther
    }
  }
)

QuestionFactory.addType(
  'SingleChoiceQuestion',
  function createSingleChoiceQuestion({
    id = null,
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
      __id: id,
      ...usesOther
    }
  }
)

QuestionFactory.addType('YesNoQuestion', function createYesNoQuestion({
  id = null,
  question = 'Answer with Yes or No'
} = {}) {
  return {
    question,
    options: [
      { name: 'Yes', value: 1, id: 1 },
      { name: 'No', value: 0, id: 2 }
    ],
    picked: {},
    specificRequired: false,
    __id: id,
    __cmp: 'YesNoQuestion',
    __type: 'YesNoQuestion'
  }
})

export default QuestionFactory
