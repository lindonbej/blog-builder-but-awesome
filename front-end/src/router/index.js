import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/Explore.vue')
  },
  {
    path: '/new',
    name: 'NewBlog',
    component: () => import('../views/NewBlog.vue')
  },
  {
    path: '/read/:blog_name',
    name: 'Read',
    component: () => import('../components/Read.vue')
  },
  {
    path: '/edit/:blog_name',
    name: 'Edit',
    component: () => import('../components/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
