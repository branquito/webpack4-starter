<script>
import { get } from 'lodash'
export default {
  props: {
    control: {
      type: Array,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  methods: {
    createLabel(h, label) {
      return h('p', [
        h(
          'label',
          {
            style: {
              color: '#444'
            }
          },
          label
        )
      ])
    }
  },
  render: function(createElement) {
    const self = this
    const [ctrlName, def] = self.control
    const model = self.model
    return createElement(
      'div',
      {
        style: {
          backgroundColor: '#f1f0ee',
          padding: '1em'
        }
      },
      [
        def.label ? this.createLabel(createElement, def.label) : '', // optionally create label
        createElement('input', {
          attrs: {
            id: ctrlName,
            'data-id': ctrlName
          },
          domProps: {
            value: get(model, def.model),
            type: def.type || 'text'
          },
          on: {
            input: function(event) {
              self.$emit('input', event.target.value, { ctrlName, binding: def.model })
            }
          }
        })
      ]
    )
  }
}
</script>
