<template>
  <div>
    <h5>Limit Setter</h5>
    <form>
      <fieldset>
        <legend>Limit</legend>
        <div clsas="row">
          <div class="col-sm-12 col-md-6">
            <label for="ls_input">Choose limit:</label>
            <input id="ls_input" ref="ls_input" :value="value.limitValue" @input="updateComboValue" />
          </div>
          <div class="col-sm-12 col-md-6">
            <label for="ls_checkbox">Choose value:</label>
            <input ref="ls_checkbox" type="checkbox" :checked="value.isHardLimit" @change="updateComboValue" />
          </div>
        </div>
      </fieldset>
    </form>
    <button class="primary small" @click="save">Save</button>
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
