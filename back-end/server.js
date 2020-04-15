const express = require('express');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true
});

// Create a schema and model for blogs hosted on the website
const blogSchema = new mongoose.Schema({
  id: String,
  name: String,
  author: String,
  posts: [{title: String, id: String}],
});
const Blog = mongoose.model('Blog', blogSchema);

// Create a schema and model for posts
const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  original_blog: String,
  date_created: Date,
  date_updated: Date,
  content: [String]
})
const Post = mongoose.model('Post', postSchema)

// API endpoints

/* returns blog names and ids */
app.get('/api/blogs', async (req, res) => {
  try {
    let blogs = await Blog.find({}, 'id name -_id');
    res.send({blogs: blogs});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/* returns post names and ids for a given blog  */
app.get('/api/blogs/:blogID', async (req, res) => {
  try {
    let blogInfo = await Blog.findOne({id: req.params.blogID}, '-_id');
    if (blogInfo) {
      res.send(blogInfo);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* returns all posts for a given blog  */
app.get('/api/posts/:blogID', async (req, res) => {
  try {
    let posts = [];
    let blog = await Blog.findOne({id: req.params.blogID});
    for (let post of blog.posts) {
      let fullPost = await Post.findOne({id: post.id}, '-_id');
      posts.push(fullPost);
    }
    res.send({posts: posts});
  } catch {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* returns a specific post  */
app.get('/api/posts/:blogID/:postID', async (req, res) => {
  try {
    let post = await Post.findOne({id: req.params.postID, original_blog: req.params.blogID}, '-_id');
    if (post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* add a new blog  */
app.post('/api/blogs', async (req, res) => {
  try {
    let duplicate = await Blog.findOne({name: req.body.name});
    if (duplicate) {
      res.status(409);
      res.send({message: "Sorry, this blog title has already been taken"});
    } else {
      const blog = new Blog({
        id: uuidv4(),
        name: req.body.name,
        author: req.body.author,
        posts: []
      })
      await blog.save();
      res.send("Ok");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* add a new post  */
app.post('/api/posts/:blogID', async (req, res) => {
  const post = new Post({
    id: uuidv4(),
    title: req.body.title,
    original_blog: req.params.blogID,
    date_created: req.body.date_created,
    date_updated: req.body.date_updated,
    content: req.body.content
  })
  try {
    let blog = await Blog.findOne({id: req.params.blogID});
    if (!blog) {
      res.sendStatus(404);
    } else {
      blog.posts.push({title: post.title, id: post.id});
      await blog.save();
      await post.save();
      res.send("Ok");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* edit blog (title)  */
app.put('/api/blogs/:blogID', async (req, res) => {
  try {
    let duplicate = await Blog.findOne({name: req.body.name});
    if (duplicate && duplicate.id !== req.params.blogID) {
      res.status(409);
      res.send({message: "Sorry, this blog title has already been taken"});
    } else {
      let blog = await Blog.findOne({id: req.params.blogID});
      blog.name = req.body.name;
      blog.author = req.body.author;
      await blog.save();
      res.send("Ok");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
     
/* edit post  */
app.put('/api/posts/:blogID/:postID', async (req, res) => {
  try {
    let blog = await Blog.findOne({id: req.params.blogID});
    let idx = blog.posts.findIndex(post => post.id === req.params.postID);
    blog.posts[idx].title = req.body.title;
    await blog.save();
    let post = await Post.findOne({id: req.params.postID, original_blog: req.params.blogID});
    post.title = req.body.title;
    post.date_updated = req.body.date_updated;
    post.content = req.body.content;
    await post.save();
    res.send("Ok");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})
    
/* "repost" a post from one blog to another  */
app.put('/api/blogs/:oldBlogID/:postID/:newBlogID', async (req, res) => {
  try {
    let post = await Post.findOne({id: req.params.postID, original_blog: req.params.oldBlogID});
    let blog = await Blog.findOne({id: req.params.newBlogID});
    blog.posts.push({title: post.title, id: post.id});
    await blog.save();
    res.send("Ok");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

/* delete blog  */
app.delete('/api/blogs/:blogID', async (req, res) => {
  try {
    let blog = await Blog.findOne({id: req.params.blogID});
    await Post.deleteMany({original_blog: blog.id});
    await Blog.deleteOne({id: blog.id});
    res.send("Ok");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

/* delete post  */
app.delete('/api/posts/:blogID/:postID', async (req, res) => {
  try {
    let post = await Post.findOne({id: req.params.postID});
    let blog = await Blog.findOne({id: req.params.blogID});
    let idx = blog.posts.find(blogpost => blogpost.id === post.id);
    blog.posts.splice(idx, 1);
    await blog.save();
    if (post.original_blog === blog.id) {
      await Post.deleteOne({id: post.id});
    }
    res.send("Ok");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3001, () => console.log('Server listening on port 3001!'));
