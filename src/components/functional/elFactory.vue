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
  render: function(createElement) {
    const self = this
    const [name, def] = self.control
    const model = self.model
    return createElement('input', {
      domProps: {
        value: get(model, def.model),
        type: def.type || 'text'
      },
      on: {
        input: function(event) {
          self.$emit('input', event.target.value, { schema_name: self.control[0], binding: def.model })
          // Update model
          // model[def.model] = event.target.value
          // self.$emit('model-change', model)
        }
      }
    })
  }
}
</script>
