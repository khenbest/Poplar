import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Posts from './views/Posts.vue'
// @ts-ignore
import PostDetails from './views/PostDetails.vue'
// @ts-ignore
import Login from './views/Login.vue'
import makePost from './components/makePost.vue'
import MyProfile from "./views/MyProfile.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/get/:postId',
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
      path: '/makePost',
      name: 'makePost',
      component: makePost
    },
    {
      path: '/posts/myProfile',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})