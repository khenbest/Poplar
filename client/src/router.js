import Vue from 'vue'
import Router from 'vue-router'
import Posts from './views/Posts.vue'
import PostDetails from './views/PostDetails.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:postId',
      name: 'postDetails',
      props: true,
      component: PostDetails
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})