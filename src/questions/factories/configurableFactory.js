import { startCase } from 'lodash'
const configurableFactory = function(name) {
  const typeMapper = {}
  const factoryName = name

  const addType = function(typeName, buildFunc) {
    if (!typeName || (!buildFunc && typeof buildFunc !== 'function')) {
      throw new Error(
        'typeName parameter not defined or buildFunc not a function!'
      )
    }

    const lcTypeName = typeName.toLowerCase()
    if (typeMapper[lcTypeName]) {
      throw new Error(`${typeName} already defined!`)
    }
    typeMapper[lcTypeName] = {
      fn: buildFunc,
      name: typeName
    }
  }

  const getObject = function(typeName, ...opts) {
    const lcTypeName = typeName.toLowerCase()
    const builder = typeMapper[lcTypeName] // returns { fn: ..., name: factoryName }

    if (builder !== undefined && typeof builder.fn === 'function') {
      return builder.fn.call(this, ...opts)
    }
    throw new Error('Cannot build this type. :(')
  }

  const getName = function() {
    return factoryName
  }

  const getAllTypes = function(humanCase = false) {
    return Object.keys(typeMapper).map(
      type =>
        humanCase ? startCase(typeMapper[type].name) : typeMapper[type].name
    )
  }

  return {
    addType,
    get: getObject,
    getName,
    getAllTypes
  }
}

export default {
  getInstance: configurableFactory
}
