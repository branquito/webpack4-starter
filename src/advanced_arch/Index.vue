<template>
  <FrameApi immediate :endpoint="getArticleList" :args="['arg1', 'arg2']">
  <template slot-scope="{ response }">
    <FramePromise
            :promise="response">
    <template
            slot-scope="{ data: articles, status: { error, pending }}">
      <p v-if="pending">Loading...</p>
      <p v-else-if="error">Error loading... Please try again.</p>
      <article
         v-else
         v-for="article in articles">
        <h2>{{ article.title }}</h2>
        <p>{{ article.body }}</p>
      </article>
    </template>
    </FramePromise>
  </template>
  </FrameApi>
</template>

<script>
import { FrameApi, FramePromise } from './FramePromise.vue'
export default {
  name: 'Index',
  components: { FrameApi, FramePromise },
  methods: {
    getArticleList(arg1, arg2) {
      console.log({ arg1, arg2 })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: [
              { id: 1, title: 'art 1', body: 'article no 1' },
              { id: 2, title: 'art 2', body: 'article no 2' }
            ]
          })
        }, 1000)
      })
    }
  }
}
</script>
