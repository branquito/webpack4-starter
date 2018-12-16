<template>
  <links-list>
    <div slot="link" slot-scope="{ link, bookmarkButtonAttrs, bookmarkButtonEvents }">
      <a :href="link.href">{{ link.title }}</a>
      <button v-bind="bookmarkButtonAttrs" v-on="bookmarkButtonEvents">bookmark</button>
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
