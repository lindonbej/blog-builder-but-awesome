<template>
  <div>
    <h2>Welcome to Blog Builder But Awesome!</h2>
    <h3>It's like <a href="http://blogbuilder.blainejohnson.name">Blog Builder</a>, but awesome.</h3>
    <p> Blog Builder But Awesome is a website for making and sharing simple blogs! You can create multiple blogs, read other people's blogs, and even repost posts from other blogs onto your own!</p>
    <p> Warning! Blog Builder But Awesome has exactly 0 authentication or security features (because I haven't learned that yet). This means literally anyone can edit your blog. Also, you can edit anyone else's blog. You've been warned.</p>
    <router-link to="/explore">
      <button>Explore Blogs!</button>
    </router-link>
    <router-link to="/new">
      <button>New Blog!</button>
    </router-link>
    <router-link to="/my-blogs">
      <button>My Blogs!</button>
    </router-link>
  </div>
</template>

<style scoped>
  button {
    margin: 10px;
  }
</style>