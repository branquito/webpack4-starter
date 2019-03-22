<script>
export default {
  props: {
    addon: {
      required: false,
      type: String,
      default: ''
    },
    theme: {
      required: true,
      type: String
    },
    isRounded: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      themes: {
        'rn-default': [
          'border',
          'border-rn-teal-darker',
          'bg-rn-teal-darker',
          'text-white'
        ],
        'rn-alternate': [
          'border',
          'border-blue-darker',
          'bg-blue-darker',
          'text-white'
        ]
      },
      type: {
        add: '+',
        remove: '-'
      }
    }
  },
  mounted() {
    if (this.isRounded) {
      this.themes[this.theme].push('rounded rounded-sm')
    }
  },
  computed: {
    cmpIcon() {
      return this.type[this.addon]
    }
  },
  render(createElement) {
    const addon = this.addon
      ? createElement(
          'span',
          {
            style: {
              display: 'inline-block',
              fontWeight: 'bold'
            },
            class: ['bg-rn-teal-darkest', 'px-3', 'py-2']
          },
          this.cmpIcon
        )
      : ''
    const text = createElement(
      'span',
      {
        style: {
          display: 'inline-block'
        },
        class: ['text-xs', 'px-3', 'py-2']
      },
      this.$slots.default
    )

    return createElement(
      'button',
      {
        class: this.themes[this.theme],
        on: {
          click: event => {
            this.$emit('click', event)
          }
        }
      },
      [addon, text]
    )
  }
}
</script>
