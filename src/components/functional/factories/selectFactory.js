import {isPlainObject, get} from "lodash"
import {normalize} from "../helpers.js"

const getSelections = (child, model, def) => {
  const trueValues = Array.from(get(model, def.model))

  return trueValues.includes(child)
}

const options = ctx => {
  const [ctrlName, def] = ctx.control
  const model = ctx.model
  return {
    attrs: {
      id: ctrlName,
      "data-id": ctrlName,
      class: ctx.themes[ctx.theme][def.type] || "",
      multiple: def.inputType === "multiple"
    },
    domProps: {
      value: get(model, def.model)
    },
    on: {
      input: function(event) {
        let ivalue = normalize(event.target.value)
        if (def.inputType === "multiple") {
          const selected = Array.from(event.target.options).reduce(
            (acc, option) => {
              if (option.selected) {
                const {text, value} = option
                acc.push({
                  text,
                  value
                })
              }
              return acc
            },
            []
          )
          ivalue = selected.map(({value}) => value)
        }
        ctx.$emit("input", ivalue, {
          ctrlName,
          binding: def.model
        })
      }
    }
  }
}

const make = (ctx, h) => {
  const [ctrlName, def] = ctx.control
  const model = ctx.model
  const children = JSON.parse(JSON.stringify(get(model, def.options)))
  const selectElement = h("select", options(ctx), [
    children.map(child => {
      if (def.inputType === "multiple") {
        console.log("child", child, true === getSelections(child, model, def))
      }
      return h(
        "option",
        {
          attrs: {
            style: getSelections(child, model, def) && "color: red",
            selected:
              def.inputType === "multiple"
                ? getSelections(child, model, def) // Check if child is present in model
                : isPlainObject(child)
                  ? child.id === (get(model, def.model) || {}).id
                  : child === get(model, def.model)
          },
          domProps: {
            value: isPlainObject(child) ? child.id : child
          }
        },
        isPlainObject(child) ? child.name : child
      )
    })
  ])
  if (def.inputType === "multiple") {
    const vNodes = Array.from(selectElement.children).map(c => c.data)
    console.log(vNodes)
  }
  return selectElement
}

export default make
