<template>
  <renderless-tags-input v-model="tags">
    <div slot-scope="{tags, removeTag}" class="tags-input">
      <input type="text" class="tags-input-text" placeholder="Add tag...">
      <span class="tags-input-tag">
        <span v-for="tag in tags">
          {{ tag }} <button type="button" @click="removeTag(tag)" class="tags-input-remove">&times;</button>
        </span>

      </span>
    </div>
  </renderless-tags-input>
</template>

<script>
import RenderlessTagsInput from "./RenderlessTagsInput.vue"
export default {
  components: {RenderlessTagsInput},
  data() {
    return {
      tags: ["tag one", "tag two", "tag three"]
    }
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
    margin-right: 1em;
  }
  &-remove {
    color: red;
  }
}
</style>
