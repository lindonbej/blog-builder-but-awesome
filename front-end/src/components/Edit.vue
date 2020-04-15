<template>
  <div class="edit">
    <h1>Edit Blog</h1>
    <button @click="read()">Read this blog</button>
    <div id="edit-field" v-if="editMode">
      <EditBox v-bind:post="selectedPost" v-bind:blogID="blogID" v-on:closed="closeEditBox"/>
    </div>
    <div id="edit-nav" v-else>
      <form id="blog-edit" v-on:submit.prevent="save">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title"/>
        <label for="author">Author</label>
        <input type="text" id="author" v-model="author"/>
        <input id="save-blog-button" type="submit" value="Save">
      </form>
      <h6 v-if="duplicateError">Sorry, that name has been taken</h6>
      <button id="new-post-button" v-on:click="newPost">Create New Post</button>
      <div id="edit-list">
        <h6 id="edit-list-title">Posts (click to edit)</h6>
        <ul id="posts">
          <li v-for="post in posts" v-bind:key="post.id">
            <button class=post-button v-on:click="selectPost(post.id)">{{post.title}}</button>
          </li>
        </ul>      
      </div>
    </div>
  </div>
</template>

<script>
import EditBox from "../components/EditBox.vue"
import axios from 'axios'
export default {
  name: 'Edit',
  components: {
    EditBox
  },
  data() {
    return {
      blogs: [],
      posts: [],
      editMode: false,
      selectedPost: undefined,
      title: this.$route.params.blog_name.replace(/-/g, " "),
      author: "",
      duplicateError: false
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
    async selectPost(postID) {
      let response = await axios.get('/api/posts/' + this.blogID + '/' + postID);
      this.selectedPost = response.data;
      this.editMode = true;
    },
    closeEditBox() {
      this.editMode = false;
      this.selectedPost = undefined;
      this.updateBlogInfo();
    },
    newPost() {
      this.selectedPost = undefined;
      this.editMode = true;
    },
    async save() {
      this.duplicateError = false;
      try {
        await axios.put('/api/blogs/' + this.blogID, {
          name: this.title,
          author: this.author
        });
        this.$router.replace('/edit/' + this.title.replace(/\s/g, "-"));
      } catch (error) {
        this.duplicateError = true;
      }
    },
    async updateBlogs() {
      let response = await axios.get('/api/blogs');
      this.blogs = response.data.blogs;
    },
    async updateBlogInfo() {
      let response = await axios.get('/api/blogs/' + this.blogID);
      this.posts = response.data.posts;
      this.author = response.data.author;
    },
    read() {
      this.$router.push('/read/' + this.$route.params.blog_name.replace(/\s/g, "-"));
    }
  },
  watch: {
    blogID() {
      this.updateBlogInfo();
    },
    $route() {
      this.updateBlogs();
    }
  }
}
</script>

<style scoped>
  .edit {
    font-size: 20px;
  }

  .post-button {
    background: none;
    border: none;
    margin-bottom: 10px;
    font-size: 20px;
  }

  #posts {
    list-style: none;
    padding-left: 0;
  }

  form * {
    margin-right: 5px;
  }

  #edit-list {
    width: 300px;
    border: 2px solid black;
    border-radius: 8px;
  }

  #edit-list-title {
    padding-left: 5px;
    margin-bottom: 15px;
    font-size: 20px;
    margin-top: 15px;
  }

  #blog-edit, #new-post-button, #edit-list {
    margin-top: 20px;
  }

  #new-post-button, #save-blog-button, #title, #author {
    font-size: 20px;
  }

  h1 {
    color: black;
  }
</style>