<script>
export const FramePromise = {
  props: {
    promise: {
      default: null,
      type: Promise
    }
  },
  data() {
    return {
      data: null,
      error: null,
      pending: false,
      resolved: null
    }
  },
  watch: {
    promise: {
      immediate: true,
      async handler() {
        console.log('this.promise', this.promise)
        if (!this.promise) return

        try {
          this.status({ pending: true })
          const { data } = await this.promise
          this.status({ data, resolved: true })
        } catch (error) {
          this.status({
            data: null,
            error,
            resolved: false
          })
        }
      }
    }
  },
  methods: {
    status({
      data = this.data,
      error = null,
      pending = false,
      resolved = null
    }) {
      this.data = data
      this.error = error
      this.pending = pending
      this.resolved = resolved
    }
  },
  render(h) {
    const children = this.$scopedSlots.default({
      data: this.data,
      status: {
        error: this.error,
        pending: this.pending,
        resolved: this.resolved
      }
    })
    return h('div', {}, children)
  }
}
export const FrameApi = {
  props: {
    endpoint: {
      type: Function,
      required: true
    },
    args: {
      type: Array,
      default: () => []
    },
    immediate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      response: undefined
    }
  },
  created() {
    if (this.immediate) this.query(this.args)
  },
  methods: {
    query(...params) {
      this.response = this.endpoint.apply(this, ...params)
    }
  },
  render(h) {
    const children = this.$scopedSlots.default({
      query: this.query,
      response: this.response
    })
    return h('div', {}, children)
  }
}
export default FramePromise
</script>
