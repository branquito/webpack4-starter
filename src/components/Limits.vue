<template>
  <div>
    <pre>possible prefixes: {{ limitPrefixes }}</pre>
    <pre>{{ comboValue }}</pre>
    <select
      :options="selectionOptions"
      v-model="selectedOption"
      @change="optionSelected">
      <option v-for="limit in selectionOptions" :value="limit.id">{{ limit.text }}</option>
    </select>
    <limit-setter
      v-if="selectedOption"
      v-model="comboValue"
      @save-combo-value="save"
      ></limit-setter>
  </div>
</template>

<script>
import LimitSetter from "./LimitSetter.vue"
import {startCase} from "lodash"
export default {
  components: {LimitSetter},
  props: {
    limits: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      selectedOption: null,
      limitPrefixes: [
        "bill_rate",
        "cost",
        "company_expense",
        "hours",
        "margin",
        "non_billable_expenses",
        "pay_rate"
      ],
      limit: "",
      comboValue: null
    }
  },
  methods: {
    save() {
      alert(JSON.stringify(this.comboValue))
    },
    optionSelected() {
      this.comboValue = {
        for: this.selectedOption,
        limitValue: "",
        isHardLimit: false
      }
    }
  },
  computed: {
    selectionOptions() {
      return Object.entries(this.limits)
        .filter(([k, v]) => v === null && this.limitPrefixes.includes(k))
        .map(([prefix, _]) => ({
          id: prefix,
          text: startCase(prefix)
        }))
    },
    noLimits() {
      return this.selectionOptions.length === this.limitPrefixes.length
    }
  }
}
</script>
<style scoped>
pre {
  color: red;
}
</style>
