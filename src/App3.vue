<template>
  <div>
    <pre>{{ model }}</pre>
    <form-factory
      :schema="schema"
      v-model="model"
      ></form-factory>
  </div>
</template>
<script>
import FormFactory from './components/FormFactory.vue'
import schema from './components/form/schema.js'
export default {
  name: 'app3',
  components: { FormFactory },
  data() {
    return {
      schema,
      model: {
        user: {
          name: 'james bond',
          pass: 'my passw',
          age: 44
        }
      }
    }
  }
}
</script>
