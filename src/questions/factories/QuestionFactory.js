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
  id = null,
  tags = []
} = {}) {
  return {
    question,
    answer: '',
    isConfidential: false,
    addPredefined: false,
    tags,
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
    tags = [],
    usesOther = undefined
  } = {}) {
    return {
      question,
      options,
      picked: [],
      isConfidential: false,
      addPredefined: false,
      tags,
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
    tags = [],
    usesOther = undefined
  } = {}) {
    return {
      question,
      options,
      picked: '',
      tags,
      isConfidential: false,
      addPredefined: false,
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
  question = '',
  tags = []
} = {}) {
  return {
    question,
    options: [
      { name: 'Yes', value: 1, id: 1 },
      { name: 'No', value: 0, id: 2 }
    ],
    picked: {},
    tags,
    isConfidential: false,
    addPredefined: false,
    specificRequired: false,
    __id: id,
    __cmp: 'YesNoQuestion',
    __type: 'YesNoQuestion'
  }
})

export default QuestionFactory
