<template>
  <renderless-tags-input>
    <div slot-scope="{}" class="tags-input">
      <input type="text" class="tags-input-text" placeholder="Add tag...">
      <span class="tags-input-tag">
        <span>Testing</span>
        <span>Design</span>
        <button type="button" class="tags-input-remove">&times;</button>
      </span>
    </div>
  </renderless-tags-input>
</template>

<script>
import RenderlessTagsInput from "./RenderlessTagsInput.vue"
export default {
  components: {RenderlessTagsInput},
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.tags-input {
  padding: 25px;

  input {
    display: block;
    margin-bottom: 1em;
  }

  &-tag span {
    padding: 5px;
    border: 1px solid green;
    display: inline-block;
  }
  &-remove {
    background-color: red;
  }
}
</style>
