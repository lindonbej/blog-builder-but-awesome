<template>
  <div class="edit">
    <h2>New Blog</h2>
    <div id="edit-nav">
      <form id="blog-edit" v-on:submit.prevent="create">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title"/>
        <label for="author">Author</label>
        <input type="text" id="author" v-model="author"/>
        <input id="create-blog-button" type="submit" value="Create">
      </form>
      <h6 v-if="duplicateError">Sorry, that name has been taken</h6>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NewBlog',
  data() {
    return {
      title: "",
      author: "",
      duplicateError: false,
    }
  },
  methods: {
    async create() {
      this.duplicateError = false;
      try {
        await axios.post('/api/blogs', {
          name: this.title,
          author: this.author
        });
        this.$router.push('/edit/' + this.title.replace(/\s/g, "-"));
      } catch (error) {
        this.duplicateError = true;
      }
    }
  },
}
</script>

<style scoped>
  .edit {
    font-size: 20px;
  }

  form * {
    margin-right: 5px;
  }

  #blog-edit {
    margin-top: 20px;
  }

  #create-blog-button, #title, #author {
    font-size: 20px;
  }
</style>