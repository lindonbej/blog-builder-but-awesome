<template>
  <div id="app">
    <div id="nav">
      <div id="brand">
        <h1>Blog Builder</h1>
      </div>
      <div id="menu">
        <router-link to="/">
          <p>Blog</p>
        </router-link>
        <router-link to="/edit">
          <p>Edit</p>
        </router-link>
      </div>
    </div>
    <router-view />
    <div id="footer">
      <p>Source code for this website available on <a href="https://github.com/lindonbej/blog-builder">Github</a></p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#nav {
  padding: 30px;
  background: #414141;
  text-align: center;
}

#footer {
  background: #414141;
}

#nav p {
  display: inline;
  padding: 10px;
}

#nav a, h1 {
  color: white;
}

#footer p, #footer a {
  color: white;
}

</style>
