import { get } from 'lodash'

const options = ctx => {
  const [ctrlName, def] = ctx.control
  const model = ctx.model
  return {
    attrs: {
      id: ctrlName,
      'data-id': ctrlName,
      class: ctx.themes[ctx.theme][def.type] || ''
    },
    domProps: {
      value: get(model, def.model),
      type: def.inputType || 'text'
    },
    on: {
      input: function(event) {
        ctx.$emit('input', event.target.value, {
          ctrlName,
          binding: def.model
        })
      }
    }
  }
}

const make = (ctx, h) => {
  return h('input', options(ctx))
}

export default make
