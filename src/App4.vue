<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <ul class="list-group">
          <draggable
            v-model="initialMeasures"
            :options="{ group: 'measures' }"
            class="drag-area selected-options measures"
            @start="highlight('measures')"
            @end="clearStyles()"
            >
            <li
            v-for="measure in initialMeasures"
            :key="measure.measure"
            class="list-group-item">
              {{ measure.measure }}
            </li>
          </draggable>
        </ul>
      </div>
      <div class="col-md-6">
        <pre>2nd column</pre>
        <ul class="list-group">
          <draggable
            v-model="selectedMeasures"
            :options="{ group: 'measures', filter: '.no-drag' }"
            :class="{ 'no-drag': !customize }"
            class="drag-area selected-options measures"
            @start="highlight('measures')"
            @end="clearStyles()"
            >
            <li
            v-for="measure in selectedMeasures"
            :key="measure.measure"
            class="list-group-item">
              {{ measure.measure }}
            </li>
          </draggable>
        </ul>
      </div>
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
import draggable from 'vuedraggable'
export default {
  name: 'app3',
  components: { draggable },
  methods: {},
  data() {
    return {
      user: null,
      customize: true,
      initialMeasures: [
        {
          measure: 'Candidates Created'
        },
        {
          measure: 'Candidates Removed'
        },
        {
          measure: 'Candidates Started Interviewing'
        },
        {
          measure: 'Offers Made'
        },
        {
          measure: 'Placed'
        },
        {
          measure: 'Job Reqs Created'
        },
        {
          measure: 'Job Reqs Closed'
        }
      ],
      selectedMeasures: []
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
<style lang="scss" scoped>
.drag-area {
  min-height: 200px;
  background-color: lightgreen;
}
</style>
