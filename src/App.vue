<template>
  <div>
  <table class="horizontal">
    <caption>Limits</caption>
    <thead>
      <tr>
        <th>Limit</th>
        <th>Value</th>
        <th>Is Hard?</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, prop) in limits">
        <td data-label="Limit">{{ prop }}</td>
        <td data-label="Value">{{ value.value ? value.value : 'N/A' }}</td>
        <td data-label="Is Hard?">{{ value.hard ? '&#x2714;' : '&#x2717;' }}</td>
      </tr>
    </tbody>
  </table>
  <app-limits
        @save-limits="save"
        :limits="limits" />
  </div>
</template>
<script>
import Limits from "./components/Limits.vue"
import saveState from "vue-save-state"
export default {
  name: "app",
  mixins: [saveState],
  components: {
    AppLimits: Limits
  },
  data() {
    return {
      message: "hello Vue!",
      limits: {
        bill_rate: {value: null, hard: false},
        cost: {value: null, hard: false},
        company_expense: {value: null, hard: false},
        hours: {value: null, hard: false},
        margin: {value: null, hard: false},
        non_billable_expenses: {value: null, hard: false},
        pay_rate: {value: null, hard: false}
      }
    }
  },
  methods: {
    save({limitValue, forWhat, isHardLimit}) {
      this.limits[forWhat] = {value: limitValue, hard: isHardLimit}
    },
    getSaveStateConfig() {
      return {
        cacheKey: "limits app",
        saveProperties: ["limits"]
      }
    }
  }
}
</script>
