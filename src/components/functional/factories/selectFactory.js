import { isPlainObject, get } from 'lodash'

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
      value: get(model, def.model)
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
  const [ctrlName, def] = ctx.control
  const model = ctx.model
  const children = JSON.parse(JSON.stringify(get(model, def.options)))
  return h('select', options(ctx), [
    children.map(child => {
      return h(
        'option',
        {
          attrs: {
            selected: isPlainObject(child)
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
}

export default make
