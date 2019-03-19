import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Posts from './views/Posts.vue'
// @ts-ignore
import PostDetails from './views/PostDetails.vue'
// @ts-ignore
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
    // {
    //   path: '/board/:boardId',
    //   name: 'board',
    //   props: true,
    //   component: Board
    // },
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