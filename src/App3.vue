<template>
  <div>
    <form-factory
      theme="bootstrap"
      :schema="schema"
      v-model="model"
      >
      <!-- possible to insert some custom element here, outside of form creation logic -->
      <img src="https://placeimg.com/100/100/any" alt="">
    </form-factory>
    <pre>{{ model }}</pre>
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
