<template>
  <div>
    <li v-for="link in links">
      <slot
        name="link"
        :link="link"
        :bookmark="bookmark"
        ></slot>
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {href: "#first", title: "First link", bookmarked: true},
        {href: "#second", title: "Second link", bookmarked: false},
        {href: "#third", title: "Third link", bookmarked: false}
      ]
    }
  },
  methods: {
    bookmark(link) {
      link.bookmarked = true
    }
  }
}
</script>
