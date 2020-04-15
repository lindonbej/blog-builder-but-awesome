<template>
  <div>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        {{blog.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      blogs: []
    }
  },
  created() {
    this.updateBlogs();
  },
  methods: {
    async updateBlogs() {
      let response = await axios.get('/api/blogs')
      this.blogs = response.data.blogs;
    }
  }
}
</script>
