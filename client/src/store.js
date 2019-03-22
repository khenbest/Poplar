import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

//sockets
import io from 'socket.io-client'
let socket = {}


Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

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
    activePost: {},
    joined: false,
    name: '',
    messages: [],
    roomData: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setActivePost(state, data) {
      state.activePost = data
    },
    //#region --SOCKETS--
    setJoined(state, payload) {
      state.joined = true
      state.name = payload;
    },
    setRoom(state, payload) {
      state.roomData = payload
    },
    newUser(state, payload) {
      Vue.set(state.roomData, 'connectedUsers', payload)
    },
    userLeft(state, payload) {
      debugger
      Vue.set(state.roomData, 'connectedUsers', payload)
    },
    addMessage(state, payload) {
      state.messages.push(payload)
    },
    setMessages(state, messages) {
      state.messages = messages
    },
    leave(state, payload) {
      state.joined = false,
        state.name = payload.name,
        state.messages = [],
        state.roomData = {}
    }
    //#endregion --SOCKETS
  },
  actions: {
    //#region --SOCKETS--
    join({ commit, dispatch }, payload) {

      commit('setJoined', payload.name);
      dispatch('socket', payload)
    },
    socket({ commit, dispatch }, payload) {
      //establish connection with socket
      socket = io('//localhost:3000')


      //Register all listeners
      socket.on('CONNECTED', data => {
        console.log('Connected to socket', payload)
        //connect to room 
        socket.emit('join', {
          name: payload.name,
          postId: payload.postId
        })
      })

      socket.on('joinedRoom', data => {
        console.log(data)
        commit('setRoom', data)
      })

      socket.on('newUser', data => {
        commit('newUser', data)
      })

      socket.on('left', data => {
        console.log('user left', data)
        commit('userLeft', data)
      })

      socket.on('newMessage', data => {
        console.log(data)
        commit('addMessage', data)
      })

      socket.on('roomHistory', messages => {
        commit('setMessages', messages)
      })

      socket.on('messageError', err => {
        console.log(err);
      })

    },
    sendMessage({ commit, dispatch }, payload) {
      socket.emit('message', payload)
    },
    leaveRoom({ commit, dispatch }, payload) {
      socket.emit('leave', payload)
      socket.close()
      commit('leave', payload)
    },
    //#endregion
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'posts' })
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
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'login' })
        })
    },
    //#endregion


    //#region -- POSTS --

    getPosts({ commit, dispatch }, myPosts) {
      let query = 'posts'
      if (myPosts) {
        query += '/myPosts'
      }
      api.get(query)
        .then(res => {
          commit('setPosts', res.data)
        })
    },
    getActivePost({ commit, dispatch }, postId) {
      api.get('/get/:postId')
        .then(res => {
          commit('setActivePost', res.data)
        })
    },
    addPost({ commit, dispatch }, postData) {
      api.post('posts', postData)
        .then(serverPost => {
          dispatch('getPosts')
          console.log(serverPost.data)
        })
    },
    deletePost({ commit, dispatch }, postId) {
      api.delete('posts/' + postId)
        .then(res => {
          dispatch('getPosts')
        })
    },
    castVote({ commit, dispatch }, payload) {
      api.put(payload.endpoint, payload.data)
        .then(res => {
          dispatch('getPosts')
        })
    }
    //#endregion
  }
})
