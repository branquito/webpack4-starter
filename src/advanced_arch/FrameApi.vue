<script>
import FramePromise from './FramePromise.vue'
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
    return h(FramePromise, {
      props: {
        promise: this.response
      },
      scopedSlots: {
        default: props => {
          return this.$scopedSlots.default({
            data: props.data,
            methods: {
              query: this.query
            },
            status: {
              error: props.status.error,
              loading: props.status.pending,
              success: props.status.resolved
            }
          })
        }
      }
    })
  }
}
export default FrameApi
</script>
