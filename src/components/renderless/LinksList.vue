<template>
  <div>
    <li v-for="link in links">
      <slot
        name="link"
        :link="link"
        :bookmarkButtonAttrs="{
        style: [link.bookmarked ? { display: 'none' } : {} ]
        }"
        :bookmarkButtonEvents="{
          click: () => bookmark(link)
        }"
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
