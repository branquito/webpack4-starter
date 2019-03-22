<template>
  <span class="w-full bg-rn-grey-darker text-white px-2px py-1px text-xxs rounded-sm">{{ startCase( text ) }}</span>
</template>
<script>
import { startCase } from 'lodash'
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    startCase
  }
}
</script>
