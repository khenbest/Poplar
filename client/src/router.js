import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Posts from './views/Posts.vue'
// @ts-ignore
import PostDetails from './views/PostDetails.vue'
// @ts-ignore
import Login from './views/Login.vue'
<<<<<<< HEAD
import makePost from './components/makePost.vue'

=======
import Profile from './views/Profile.vue'
import MyProfile from './views/MyProfile.vue'
>>>>>>> f425957a7bca2f6661ec18adc5e61f225ba5dab9
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      // path: '/posts/:postId',
      path: '/posts/',
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
      path: '/posts/myPosts',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})