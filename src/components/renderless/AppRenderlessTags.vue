<template>
  <links-list>
    <div slot="link" slot-scope="{ link }">
      <a :href="link.href">{{ link.title }}</a>
    </div>
  </links-list>
</template>

<script>
import LinksList from "./LinksList.vue"
export default {
  components: {LinksList},
  data() {
    return {}
  }
}
</script>
