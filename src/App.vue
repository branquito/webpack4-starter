<template>
  <app-limits :limits="limits"></app-limits>
</template>
<script>
import Limits from "./components/Limits.vue"
export default {
  name: "app",
  components: {
    AppLimits: Limits
  },
  data() {
    return {
      message: "hello Vue!",
      limits: {
        bill_rate: 23,
        cost: null,
        company_expense: null,
        hours: null,
        margin: null,
        non_billable_expenses: null,
        pay_rate: null
      }
    }
  }
}
</script>
