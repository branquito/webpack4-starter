<template>
  <button
    ref="button"
    type="button"
    data-style="zoom-in"
    :class="['btn', sizeClass, colorClass]"
    @contextmenu.prevent="isConfirming = false"
    @click="handleClick">
    <slot name="loaderActions" v-bind="actions"></slot>
    <span class="ladda-label">
      <template v-if="isConfirming">Confirm</template>
      <i
        v-if="faIcon"
        :class="iconClasses"/>
      <slot/>
      <template v-if="isConfirming">?</template>
    </span>
  </button>
</template>
<script>
import * as Ladda from 'ladda'

const allowedSizes = ['lg', 'sm', 'md', 'xs', 'block']
const allowedColors = [
  'default',
  'primary',
  'success',
  'info',
  'danger',
  'lightgray',
  'warning'
]

const hasAllowedValue = allowed => value => allowed.includes(value)

const hasAllowedSize = hasAllowedValue(allowedSizes)
const hasAllowedColor = hasAllowedValue(allowedColors)

const prefix = str => `btn-${str}`

export default {
  props: {
    faIcon: {
      type: String,
      default: null
    },
    size: {
      type: String,
      validator: hasAllowedSize,
      default: 'sm'
    },
    color: {
      type: String,
      validator: hasAllowedColor,
      default: 'primary'
    },
    confirmable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      l: null,
      btnIcon: false,
      isConfirming: false
    }
  },

  computed: {
    actions() {
      if (this.l) {
        const { start, stop } = this.l

        return {
          startLoader: start.bind(this.l),
          stopLoader: stop.bind(this.l)
        }
      }
    },
    iconClasses () {
      return {
        fa: true,
        small: this.size === 'xs',
        [`fa-${this.faIcon}`]: true
      }
    },

    colorClass () {
      return prefix(this.color || 'primary')
    },

    sizeClass () {
      return prefix(this.size || 'sm')
    }
  },

  mounted () {
    this.l = Ladda.create(this.$refs.button)
    this.$once('hook:beforeDestroy', () => {
      this.l.remove()
    })
  },

  methods: {
    onConfirm () {
      if (this.isConfirming === false) {
        this.isConfirming = true
      } else {
        this.isConfirming = false
        this.$emit('click')
      }
    },
    handleClick (e) {
      if (this.confirmable) {
        this.onConfirm()
      } else {
        this.$emit('click', e)
      }
    }
  }

}
</script>

<style src="ladda/dist/ladda.min.css"></style>

<style lang="scss" scoped>
</style>

