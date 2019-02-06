<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6"></div>
    </div>
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <pre>{{ user }}</pre>
        <pre>{{ response }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app3',
  components: {},
  methods: {},
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.user = this.$store.state.user
    this.getCube('Recruiting%20Counts')
  },
  computed: {
    ...mapState(['response'])
  },
  methods: {
    ...mapActions(['getCube'])
  }
}
</script>
<style>
</style>
