<template>
  <div class="blog">
    <h1>{{title}}</h1>
    <button @click="edit()">Edit this blog</button>
    <ul v-for="post in posts" v-bind:key="post.date_created">
      <li>
        <Post v-bind:post="post"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Post from "../components/Post.vue"
export default {
  name: "Blog",
  components: {
    Post
  },
  data() {
    return {
      blogs: [],
      title: this.$route.params.blog_name.replace(/-/g, " "),
      posts: []
    }
  },
  computed: {
    blogID() {
      let blog = this.blogs.find(blog => blog.name === this.$route.params.blog_name.replace(/-/g, " "));
      if (blog) {
        return blog.id;
      } else {
        return "";
      }
    }
  },
  created() {
    this.updateBlogs();
  },
  methods: {
    async updateBlogs() {
      let response = await axios.get('/api/blogs');
      this.blogs = response.data.blogs;
    },
    async updatePosts() {
      let response = await axios.get('/api/posts/' + this.blogID);
      this.posts = response.data.posts;
    },
    edit() {
      this.$router.push('/edit/' + this.$route.params.blog_name.replace(/\s/g, "-"));
    }
  },
  watch: {
    $route() {
      this.updateBlogs();
    },
    blogID() {
      this.updatePosts();
    }
  }
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
