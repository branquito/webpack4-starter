<template>
  <span class="w-full bg-rn-grey-darker text-white px-2 py-1 text-xxs rounded-sm">{{ text }}</span>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
