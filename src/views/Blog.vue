<template>
  <div class="blog">
    <h1>{{title}}</h1>
    <ul v-for="post in posts" v-bind:key="post.id">
      <li>
        <Post v-bind:post="post"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Post from "../components/Post.vue"
export default {
  name: "Blog",
  components: {
    Post
  },
  data() {
    return {
      title: this.$root.$data.title,
      posts: this.$root.$data.posts
    }
  },
}
</script>

<style scoped>
  li {
    list-style: none;
  }

  h1 {
    color: black;
  }
</style>
