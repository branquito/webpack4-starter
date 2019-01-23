<script>
import { inputFactory, buttonFactory, labelFactory, selectFactory } from './factories'
export default {
  inject: ['theme', 'themes'],
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
  data() {
    return {
      typeDefs: {
        input: {
          type: 'text'
        },
        button: {},
        select: {}
      }
    }
  },
  computed: {
    knownTypes() {
      return Object.keys(this.typeDefs)
    }
  },
  methods: {
    makeElmnt(type, def, h) {
      switch (type) {
        case 'input':
          return inputFactory(this, h)
        case 'button':
          return buttonFactory(this, h)
        case 'select':
          return selectFactory(this, h)
        default:
          console.warn(`Sorry I don't know how to render ${type.toUpperCase()}`)
      }
    },
    createLabel(h) {
      return labelFactory(this, h)
    }
  },
  render: function(createElement) {
    const [_, def] = this.control

    const elmntType = def.type // type of form control

    /*
    * Do we know about this element?
    */
    if (!this.knownTypes.includes(elmntType)) return

    return createElement(
      'div',
      {
        style: {
          backgroundColor: '#f1f0ee',
          padding: '1em'
        }
      },
      [def.label ? this.createLabel(createElement) : '', this.makeElmnt(elmntType, def, createElement)]
    )
  }
}
</script>
