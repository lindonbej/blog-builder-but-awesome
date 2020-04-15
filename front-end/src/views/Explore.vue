<template>
  <div>
    <h1>Explore Blogs</h1>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        <p>{{blog.name}}</p>
        <button @click="read(blog.name)">Read</button>
        <button @click="edit(blog.name)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  li {
    list-style: none;
  }

  li p {
    display: inline;
  }

  li * {
    margin: 10px;
  }

  h1 {
    color: black;
  }
</style>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      blogs: []
    }
  },
  created(){
    this.updateBlogs();
  },
  methods: {
    async updateBlogs() {
      let response = await axios.get('/api/blogs');
      this.blogs = response.data.blogs;
    },
    read(name) {
      this.$router.push('/read/' + name.replace(/\s/g, "-"));
    },
    edit(name) {
      this.$router.push('/edit/' + name.replace(/\s/g, "-"));
    }
  }
}
</script>
