<template>
  <button
    ref="button"
    type="button"
    data-style="zoom-in"
    :class="[sizeClass, colorClass]"
    @contextmenu.prevent="isConfirming = false"
    @click="onClick($event)">
    <span class="ladda-label">
      <template v-if="isConfirming">Confirm</template>
      <i
        v-if="icon"
        :class="[ 'fa', iconClasses ]"/>
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

const prefix = arg => `btn-${arg}`

export default {
  props: {
    size: {
      type: String,
      validator: hasAllowedSize,
      default: 'sm'
    },
    icon: {
      type: String,
      validator: value => value.startsWith('fa-'),
      default: null
    },
    color: {
      type: String,
      validator: hasAllowedColor,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: null
    },
    shouldConfirm: {
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
  watch: {
    loading() {
      if (this.loading) {
        this.l.start()
      } else {
        this.l.stop()
      }
    }
  },

  computed: {
    classes () {
      return {
        'btn-icon': !!this.icon && this.btnIcon
      }
    },
    iconClasses () {
      return {
        [this.icon]: true,
        small: this.size === 'xs'
      }
    },
    colorClass () {
      return prefix(this.color || 'primary')
    },
    sizeClass () {
      if (!this.size) {
        return 'btn-sm'
      } else {
        return prefix(this.size)
      }
    }
  },

  mounted () {
    this.btnIcon = !!this.$slots.default
    this.l = Ladda.create(this.$refs.button)
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
    onClick (event) {
      if (this.shouldConfirm) {
        this.onConfirm()
      } else {
        this.$emit('click', event)
      }
    }
  }

}
</script>

<style src="ladda/dist/ladda.min.css"></style>

<style lang="scss" scoped>
</style>

