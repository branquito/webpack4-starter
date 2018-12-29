<template>
  <div>
    <renderless-log :value="tags" :format="logFormat"></renderless-log>
    <renderless-tags-input v-model="tags">
      <div slot-scope="{tags, removeTag, inputAttrs, inputEvents}" class="tags-input">
        <input
          type="text"
          class="tags-input-text"
          placeholder="Add tag..."
          v-bind="inputAttrs"
          v-on="inputEvents"
          >
          <span class="tags-input-tag">
            <!-- IMPORTANT tags here is not from the model, but from slot-scope from above -->
            <span v-for="tag in tags">
              {{ tag }} <button type="button" @click="removeTag(tag)" class="tags-input-remove">&times;</button>
            </span>

          </span>
      </div>
    </renderless-tags-input>
  </div>
</template>

<script>
import RenderlessTagsInput from "./RenderlessTagsInput.vue"
import RenderlessLog from "./RenderlessLog.vue"
export default {
  components: {RenderlessTagsInput, RenderlessLog},
  data() {
    return {
      tags: ["tag one", "tag two", "tag three"]
    }
  },
  methods: {
    logFormat(value) {
      console.table(value)
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
