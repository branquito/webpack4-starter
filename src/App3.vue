<template>
  <form-example :frmModel="frmModel"></form-example>
</template>
<script>
import FormExample from "./components/FormExample.vue"
export default {
  name: "app3",
  components: {FormExample},
  data() {
    return {
      frmModel: {
        name: {
          type: "text"
        },
        pin: {
          type: "password"
        },
        age: {
          type: "text"
        }
      }
    }
  }
}
</script>
