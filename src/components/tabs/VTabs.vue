<template>
  <div>
    <ul class="nav nav-tabs">
      <li :class="{ 'active': tab.active }" v-for="tab in tabs"><a @click.prevent="switchTab(tab.hash)">{{ tab.name }}</a></li>
    </ul>
    <slot />
  </div>
</template>
<script>
export default {
  name: "tabs",
  data() {
    return {
      tabs: []
    }
  },
  methods: {
    findTab(hash) {
      return this.tabs.find(tab => tab.hash === hash)
    },
    switchTab(hash) {
      const selectedTab = this.findTab(hash)
      if (typeof selectedTab === "undefined") {
        return
      }
      this.tabs.forEach(tab => (tab.active = tab.hash === selectedTab.hash))
    }
  },
  mounted() {
    this.switchTab(this.tabs[0].hash)
  },
  created() {
    this.tabs = this.$children
  }
}
</script>
