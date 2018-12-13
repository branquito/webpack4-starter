<template>
  <div class="root">
    <h3>app calculate rate</h3>
    <h5>mutable fields: {{ mutable }}</h5>
    <p>
      <label for="frequency">Frequency:</label>
      <select
       id="frequency"
       @change="frequencySelected"
       >
       <option v-for="opt in frequencies" :value="opt">{{ opt }}</option>
      </select>
    </p>
    <p>
      <label for="calculationMethod">Calculation for:</label>
      <select
        id="calculationMethod"
        v-model="calculated"
       @change="calculationMethodSelected"
       >
       <option v-for="opt in ['bill_rate', 'pay_rate', 'margin']" :value="opt">{{ opt }}</option>
      </select>
    </p>
    <p>
      <label for="bill_rate">Bill Rate</label>
      <input
        v-model.number="fields.bill_rate"
        @input="inputChanged"
        :disabled="calculated === 'bill_rate'"
        id="bill_rate"
        type="text">
    </p>
    <p>
      <label for="pay_rate">Pay Rate</label>
      <input
        v-model.number="fields.pay_rate"
        @input="inputChanged"
        :disabled="calculated === 'pay_rate'"
        id="pay_rate"
        type="text">
    </p>
    <p>
      <label for="margin">Margin</label>
      <input
        v-model.number="fields.margin"
        @input="inputChanged"
        :disabled="calculated === 'margin'"
        id="margin" type="text"
        >
    </p>
    <p>Margin (percentage value): {{ marginPercent }}</p>
  </div>
</template>
<script>
const add = (m, n) => m + n
const substract = (m, n) => m - n
const curry = f => x => y => f(x, y)

const curriedAdd = curry(add)
const curriedSubstract = curry(substract)
export default {
  data() {
    return {
      margin_in_percent: false,
      calculated: 'bill_rate',
      frequencies: ['hourly', 'weekly', 'monthly'],
      fields: {
        bill_rate: 0, // must be the first operand, because of reuduce() method below!
        pay_rate: 0,
        margin: 0
      },
      mutable: []
    }
  },
  methods: {
    inputChanged(e) {
      this.mutable = Object.entries(this.fields).filter(([type, value]) => {
        return type !== this.calculated
      })
      const f = this.calculated === 'bill_rate' ? curriedAdd : curriedSubstract
      const result = this.mutable.reduce(([t1, v1], [t2, v2]) => {
        // v1 !== '' ? v1 : 0
        // v2 !== '' ? v2 : 0
        return f(Math.abs(v1))(Math.abs(v2))
      })
      this.fields[this.calculated] = result
    },
    frequencySelected() {
      console.log('frequency selected')
    },
    calculationMethodSelected(e) {
      console.log('calculation method selected', e.target.value)
    }
  },
  computed: {
    realMargin() {
      return this.margin_in_percent ? this.fields.margin / 100 : this.fields.margin
    },
    marginPercent() {
      if (this.fields.bill_rate !== 0) {
        return (this.fields.margin / this.fields.bill_rate) * 100 + '%'
      }
      return 'division by zero'
    }
  }
}
</script>
<style scoped>
.root {
  display: block;
  text-align: center;
}
.root input:disabled {
  border: none;
  border-bottom: 3px solid blue;
}
</style>
