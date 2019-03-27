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
import friendProfile from '@/views/friendProfile.vue'
import friendPosts from '@/views/friendPosts.vue'

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
      path: '/posts/friendPosts/',
      name: 'friendPosts',
      props: true,
      component: friendPosts
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
      path: '/posts/profile/:id',
      props: true,
      name: 'friendProfile',
      component: friendProfile
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})