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
    typeMapper[lcTypeName] = buildFunc
  }

  const getObject = function(typeName, ...opts) {
    const lcTypeName = typeName.toLowerCase()
    const builder = typeMapper[lcTypeName]

    if (builder !== undefined) {
      return builder.call(this, ...opts)
    }
    throw new Error('Cannot build this type. :(')
  }

  const getName = function() {
    return factoryName
  }

  return {
    addType,
    get: getObject,
    getName
  }
}

export default {
  getInstance: configurableFactory
}
