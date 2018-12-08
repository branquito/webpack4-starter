<template>
  <div>
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
      <div class="row">
        <div class="col-sm-6">
          <div class="card fluid"><pre>possible prefixes: {{ limitPrefixes }}</pre></div>
        </div>
        <div class="col-sm-6">
          <div v-if="selectedOption" class="card fluid"><pre>{{ comboValue }}</pre></div>
        </div>
      </div>
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
      if (this.comboValue.limitValue.trim()) {
        this.$emit("save-limits", this.comboValue)
        this.selectedOption = null // Reset selection
      } else {
        alert("Value must be present!")
      }
    },
    optionSelected() {
      this.comboValue = {
        forWhat: this.selectedOption || "",
        limitValue: "",
        isHardLimit: false
      }
    }
  },
  computed: {
    selectionOptions() {
      return Object.entries(this.limits)
        .filter(([k, v]) => v.value === null && this.limitPrefixes.includes(k))
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
