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
          age: 44,
          team: {
            selected: 3,
            options: [
              { id: 1, name: 'team A' },
              { id: 2, name: 'team B' },
              { id: 3, name: 'team C' },
              { id: 4, name: 'team D' }
            ]
          },
          timeline: {
            selected: 3,
            options: [
              { id: 1, name: 'history A' },
              { id: 2, name: 'history B' },
              { id: 3, name: 'history C' },
              { id: 4, name: 'history D' }
            ]
          }
        }
      }
    }
  }
}
</script>
