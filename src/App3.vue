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
export default {
  name: 'app3',
  components: { FormFactory },
  data() {
    return {
      model: {
        user: {
          name: 'james bond',
          pass: 'my passw',
          age: 44,
          instrument: 'guitar'
        }
      },
      schema: {
        name: {
          type: 'text',
          model: 'user.name'
        },
        pin: {
          type: 'password',
          model: 'user.pass'
        },
        age: {
          type: 'text',
          model: 'user.age'
        },
        instrument: {
          type: 'text',
          model: 'user.instrument'
        }
      }
    }
  }
}
</script>
