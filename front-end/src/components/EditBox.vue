<template>
  <div class="edit-box">
    <div id="buttons">
      <button v-on:click="save">Save</button>
      <button v-on:click="close">Close</button>
      <button v-on:click="deletePost">Delete</button>
    </div>
    <form v-on:submit.prevent="save">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title"/>
      <br/>
      <label for="text">Content</label>
      <br/>
      <textarea id="text" v-model="text"></textarea>
      <br/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "EditBox",
  props: {
    blogID: String,
    post: Object,
  },
  data() {
    return {
      title: "Untitled",
      text: [],
      id: -1,
    }
  },
  created() {
    if (this.post != undefined) {
      this.id = this.post.id;
      this.title = this.post.title;
      this.text = "";
      let content = this.post.content;
      for (let i = 0; i < content.length - 1; i++) {
        this.text += content[i] + "\n\n";
      }
      this.text += content[content.length - 1];
    }
  },
  computed: {
    content() {
      return this.text.slice(0).split("\n\n");
    }
  },
  methods: {
    close() {
      this.$emit("closed");
    },
    async save() {
      this.added = true;
      if (this.title === "") {
        this.title = "Untitled";
      }
      if (this.post == undefined && this.id == -1) {
        let post = {
          title: this.title,
          original_blog: this.blogID,
          date_created: Date(),
          date_updated: undefined,
          content: this.content
        }
        await axios.post('/api/posts/' + this.blogID, post);
      } else {
        let update = {
          title: this.title,
          dateUpdated: Date(),
          content: this.content
        }
        await axios.put('/api/posts/' + this.blogID + '/' + this.post.id, update);
      }
    },
    async deletePost() {
      if (this.id != -1) {
        await axios.delete('/api/posts/' + this.blogID + '/' + this.post.id);
      }
      this.$emit("closed");
    }
  }
}
</script>

<style scoped>
.edit-box {
  width: 1000px;
  margin-top: 10px;
}

textarea {
  width: 1000px;
  height: 600px;
  font-size: 20px;
}

#buttons {
  padding-left: 600px;
}

#buttons button {
  margin-right: 10px;
  font-size: 20px;
}

form * {
  margin: 5px;
}

#title {
  font-size: 20px;
}
</style>