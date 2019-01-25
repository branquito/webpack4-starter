import {isPlainObject, get} from "lodash"
import {normalize} from "../helpers.js"
import selectOptions from "./selectOptions.js"
import Vue from "vue"

const itemStyle = {
  display: "block",
  width: "100%",
  padding: ".25rem 1.5rem",
  clear: "both",
  "font-weight": 400,
  color: "#212529",
  "text-align": "inherit",
  "white-space": "nowrap",
  border: 0
}

const options = ctx => {
  const [ctrlName, def] = ctx.control
  return {
    attrs: {
      id: ctrlName,
      "data-id": ctrlName,
      class: ctx.themes[ctx.theme][def.type] || "dropdown"
    }
  }
}

const switchState = state => {
  return state === "none" ? "block" : "none"
}

const isActive = (option, model, def) => {
  let o = isPlainObject(option) ? option.id : option
  return get(model, def.model) === o
}

const make = (ctx, h) => {
  const {model, shared} = ctx
  const [ctrlName, def] = ctx.control
  const children = JSON.parse(JSON.stringify(get(model, def.options)))
  return h("div", options(ctx, h), [
    h(
      "button",
      {
        class: ["btn", "btn-danger", "dropdown-toggle"],
        on: {
          click: function(event) {
            shared.dropdownState = switchState(shared.dropdownState)
          }
        }
      },
      "Select team"
    ),
    h("select-options", {
      props: {
        options: children,
        visible: shared.dropdownState
      },
      scopedSlots: {
        default: option => {
          return h(
            "a",
            {
              class: [
                "dropdown-item",
                {
                  active: isActive(option, model, def)
                }
              ],
              style: itemStyle,
              attrs: {
                "data-id": isPlainObject(option) ? option.id : option,
                href: "#"
              },
              on: {
                click: function(event) {
                  let ivalue = normalize(event.target.getAttribute("data-id"))
                  // This will update the model
                  shared.dropdownState = "none"
                  ctx.$emit("input", ivalue, {
                    ctrlName,
                    binding: def.model
                  })
                }
              }
            },
            [
              isPlainObject(option)
                ? `${option.id} - ${option.name}`
                : `${option}`
            ]
          )
        }
      }
    })
  ])
}

export default make
