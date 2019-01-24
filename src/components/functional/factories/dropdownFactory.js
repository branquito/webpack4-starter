import { isPlainObject, get } from 'lodash'
import { normalize } from '../helpers.js'
import Vue from 'vue'

const options = ctx => {
  const [ctrlName, def] = ctx.control
  return {
    attrs: {
      id: ctrlName,
      'data-id': ctrlName,
      class: ctx.themes[ctx.theme][def.type] || 'dropdown'
    }
    // domProps: {
    //   value: get(model, def.model)
    // },
  }
}

Vue.component('dropdown-options', {
  props: {
    options: Array,
    visible: 'none'
  },
  render(h) {
    return h(
      'div',
      {
        class: ['dropdown-menu'],
        style: {
          display: 'none'
        }
      },
      this.options.map(option => {
        return this.$scopedSlots.default(option)
      })
    )
  }
})

const make = (ctx, h) => {
  const model = ctx.model
  const [ctrlName, def] = ctx.control
  const children = JSON.parse(JSON.stringify(get(model, def.options)))
  let dropdownVisible = 'none'
  return h('div', options(ctx, h), [
    h(
      'button',
      {
        class: ['btn', 'btn-danger', 'dropdown-toggle'],
        on: {
          click: function(event) {
            console.log({ dropdownVisible })
            dropdownVisible = dropdownVisible === 'none' ? 'blck' : 'none'
          }
        }
      },
      'Click me'
    ),
    h('dropdown-options', {
      props: {
        options: children,
        visible: dropdownVisible
      },
      scopedSlots: {
        default: option => {
          return h(
            'a',
            {
              class: ['dropdown-item', { active: get(model, def.model) === option.id }],
              style: {
                display: 'block',
                width: '100%',
                padding: '.25rem 1.5rem',
                clear: 'both',
                'font-weight': 400,
                color: '#212529',
                'text-align': 'inherit',
                'white-space': 'nowrap',
                'background-color': 'transparent',
                border: 0
              },
              attrs: {
                'data-id': option.id,
                href: '#'
              },
              on: {
                click: function(event) {
                  let ivalue = normalize(event.target.getAttribute('data-id'))
                  ctx.$emit('input', ivalue, {
                    ctrlName,
                    binding: def.model
                  })
                }
              }
            },
            `${option.id} - ${option.name}`
          )
        }
      }
    })
  ])
}

export default make
