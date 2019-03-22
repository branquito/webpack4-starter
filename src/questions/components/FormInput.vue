<template>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="text-sm font-medium text-rn-grey-dark-label">{{ label }}</label>
        </div>
        <div class="md:w-2/3">
          <input
            class="border rounded rounded-sm leading-normal"
            type="text"
            :value="value"
            @input="$emit('input', $event.target.value)"
            >
        </div>
      </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Array],
      required: true
    }
  }
}
</script>
