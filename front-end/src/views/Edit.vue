<template>
  <div class="edit">
    <div id="edit-field" v-if="editMode">
      <EditBox v-bind:post="selectedPost" v-on:closed="closeEditBox"/>
    </div>
    <div id="edit-nav" v-else>
      <form id="title-edit" v-on:submit.prevent="save">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title"/>
        <input id="save-title-button" type="submit" value="Save">
      </form>
      <button id="new-post-button" v-on:click="newPost">Create New Post</button>
      <div id="edit-list">
        <h6 id="edit-list-title">Posts (click to edit)</h6>
        <ul id="posts">
          <li v-for="post in posts" v-bind:key="post.id">
            <button class=post-button v-on:click="selectPost(post)">{{post.title}}</button>
          </li>
        </ul>      
      </div>
    </div>
  </div>
</template>

<script>
import EditBox from "../components/EditBox.vue"
export default {
  name: 'Edit',
  components: {
    EditBox
  },
  data() {
    return {
      posts: this.$root.$data.posts,
      editMode: false,
      selectedPost: undefined,
      title: this.$root.$data.title,
    }
  },
  methods: {
    selectPost(post) {
      this.selectedPost = post;
      this.editMode = true;
    },
    closeEditBox() {
      this.editMode = false;
      this.selectedPost = undefined;
    },
    newPost() {
      this.selectedPost = undefined;
      this.editMode = true;
    },
    save() {
      this.$root.$data.title = this.title;
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

  #title-edit, #new-post-button, #edit-list {
    margin-top: 20px;
  }

  #new-post-button, #save-title-button, #title {
    font-size: 20px;
  }
</style>