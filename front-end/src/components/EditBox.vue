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
export default {
  name: "EditBox",
  props: {
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
    save() {
      this.added = true;
      if (this.title === "") {
        this.title = "Untitled";
      }
      if (this.post == undefined && this.id == -1) {
        if (this.$root.$data.posts.length == 0) {
          this.id = 0;
        } else {
          this.id = this.$root.$data.posts[0].id + 1;
        }
        let post = {
          id: this.id,
          title: this.title,
          dateCreated: Date(),
          dateUpdated: undefined,
          content: this.content
        }
        this.$root.$data.posts.unshift(post);
      } else {
        let postIdx = this.$root.$data.posts.findIndex(post => post.id == this.id);
        let post = this.$root.$data.posts[postIdx];
        post.title = this.title;
        post.content = this.content;
        post.dateUpdated = Date();
        this.$root.$data.posts[postIdx] = post;
      }
    },
    deletePost() {
      if (this.id != -1) {
        let postIdx = this.$root.$data.posts.findIndex(post => post.id == this.id);
        this.$root.$data.posts.splice(postIdx, 1);
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