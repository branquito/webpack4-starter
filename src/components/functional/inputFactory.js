import {get} from "lodash"

const inputFactory = ctx => {
  const [ctrlName, def] = ctx.control
  const model = ctx.model
  return {
    attrs: {
      id: ctrlName,
      "data-id": ctrlName
    },
    domProps: {
      value: get(model, def.model),
      type: def.inputType || "text"
    },
    on: {
      input: function(event) {
        ctx.$emit("input", event.target.value, {
          ctrlName,
          binding: def.model
        })
      }
    }
  }
}

export default inputFactory
