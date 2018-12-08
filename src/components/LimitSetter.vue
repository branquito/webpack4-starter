<template>
  <div>
    <h5>Limit Setter</h5>
    <input ref="ls_input" :value="value.limitValue" @input="updateComboValue" />
    <p>
      <label>
        Hard limit: <input ref="ls_checkbox" type="checkbox" :checked="value.isHardLimit" @change="updateComboValue" />
      </label>
    </p>
    <button @click="save">Save</button>
  </div>
</template>
<script>
import {startCase} from "lodash"
export default {
  props: ["value"],
  methods: {
    save() {
      this.$emit("save-combo-value")
    },
    updateComboValue(e) {
      this.$emit(
        "input",
        Object.assign(this.value, {
          limitValue: this.$refs.ls_input.value,
          isHardLimit: this.$refs.ls_checkbox.checked
        })
      )
    }
  }
}
</script>
</script>
