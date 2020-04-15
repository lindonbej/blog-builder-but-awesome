<template>
  <div>
    <h2>Welcome to OpenBlogger!</h2>
    <h3>It's like Blogger, but open.</h3>
    <p>OpenBlogger is a website for open source blogs! Blogs created here belong to everyone, so anyone can read and edit any of the blogs.</p>
    <router-link to="/explore">
      <button>Explore Blogs!</button>
    </router-link>
    <router-link to="/new">
      <button>New Blog!</button>
    </router-link>
  </div>
</template>

<style scoped>
  button {
    margin: 10px;
  }
</style>