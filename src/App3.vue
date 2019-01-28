<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <form-factory
          :schema="schema_dogs"
          v-model="dogModel"
          @submit="act"
          >
        </form-factory>
      </div>
      <div class="col-md-6">
        <pre>{{ dogModel }}</pre>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <form-factory
           theme="bootstrap"
           :schema="schema"
           v-model="model"
           @submit="act"
           >
           <!-- possible to insert some custom element here, outside of form creation logic -->
          <img src="https://placeimg.com/100/100/any" alt="">
        </form-factory>
      </div>
      <div class="col-md-6">
        <pre>{{ model }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import FormFactory from './components/FormFactory.vue'
import schema from './components/form/schema.js'
import schema_dogs from './components/form/schema_dogs.js'
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
      schema_dogs,
      dogModel: {
        breeds: {
          multiSelectValue: [],
          options: ['Akita', 'Beagle', 'Yorkshire Terrier', 'Australian Cattle Dog']
        }
      },
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
            selected: 'history A',
            options: ['history A', 'history B']
          }
        }
      }
    }
  }
}
</script>
<style>
.dropdown-item.active {
  background: lightblue;
}
</style>
