<script>
import inputFactory from "./inputFactory.js"
export default {
  data() {
    return {
      typeDefs: {
        input: {
          type: "text"
        },
        button: {}
      }
    }
  },
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
  computed: {
    knownTypes() {
      return Object.keys(this.typeDefs)
    }
  },
  methods: {
    createElmnt(type, h) {
      const methodName = "make" + type[0].toUpperCase().concat(type.slice(1))

      let opts
      switch (type) {
        case "input":
          opts = inputFactory(this)
          break
        default:
          console.error(
            `Sorry I don't know how to render ${type.toUpperCase()}`
          )
      }
      /*
      * Call method that knows how to render this type of element
      */
      if (this[methodName]) {
        return this[methodName].call(this, type, opts, h)
      }
    },
    makeInput(type, opts, h) {
      return h(type, opts)
    },
    createLabel(h, label) {
      return h("p", [
        h(
          "label",
          {
            style: {
              color: "#444"
            }
          },
          label
        )
      ])
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
      "div",
      {
        style: {
          backgroundColor: "#f1f0ee",
          padding: "1em"
        }
      },
      [
        def.label ? this.createLabel(createElement, def.label) : "", // optionally create label
        this.createElmnt(elmntType, createElement)
      ]
    )
  }
}
</script>
