<template>
  <div>
    <form-factory
      theme="bootstrap"
      :schema="schema"
      v-model="model"
      @submit="act"
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
  methods: {
    act(...args) {
      const [event, ...rest] = args
      const { binding, model, ctrlName } = rest[0]
      console.table(JSON.parse(JSON.stringify(model)))
      // if (typeof this[method] !== 'function') return
      // this[args[1].binding](...args)
    }
  },
  data() {
    return {
      schema,
      model: {
        user: {
          name: 'james bond',
          pass: 'my passw',
          age: 44,
          team: {
            selected: 2,
            options: [{ id: 1, name: 'team A' }, { id: 2, name: 'team B' }]
          },
          timeline: {
            selected: 1,
            options: [{ id: 1, name: 'history A' }, { id: 2, name: 'history B' }]
          }
        }
      }
    }
  }
}
</script>
