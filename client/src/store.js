import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    posts: [],
    activePost: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'posts' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'posts' })
        })
    },
    //#endregion


    //#region -- POSTS --
    getBoards({ commit, dispatch }) {
      api.get('posts')
        .then(res => {
          commit('setPosts', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('posts', boardData)
        .then(serverBoard => {
          dispatch('getPosts')
        })
    },
    deleteBoard({ commit, dispatch }, postId) {
      api.delete('postss/' + postId)
        .then(res => {
          dispatch('getPost')
        })
    }
    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})
