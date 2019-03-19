import Vue from 'vue'
import Router from 'vue-router'
import Posts from './views/Posts.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
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