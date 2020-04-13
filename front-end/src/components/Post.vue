<template>
  <div class="post">
    <h3>{{post.title}}</h3>
    <p>Written on {{post.dateCreated}}</p>
    <p v-if="post.dateUpdated != undefined">Last updated on {{post.dateUpdated}}</p>
    <p v-for="(paragraph, index) in post.content" v-bind:key="index">{{paragraph}}</p>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: Object
  },
}
</script>

<style scoped>
  .post {
    width: 700px;
    border: 2px solid #414141;
    padding: 20px;
    border-radius: 8px;
  }
</style>