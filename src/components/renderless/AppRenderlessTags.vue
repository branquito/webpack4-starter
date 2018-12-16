<template>
  <links-list>
    <div slot="link" slot-scope="{ link, bookmark }">
      <a :href="link.href">{{ link.title }}</a>
      <button v-if="!link.bookmarked" @click="bookmark(link)">bookmark</button>
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
