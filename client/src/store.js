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
    activeBoard: {},
    joined: false,
    name: '',
    messages: [],
    roomData: {}
  },
  mutations: {
    //sockets
    setUser(state, user) {
      state.user = user
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setJoined(state, payload) {
      state.joined = true
      state.name = payload;
    },
    setRoom(state, payload) {
      state.roomData = payload
    },
    newUser(state, payload) {
      Vue.set(state.roomData.connectedUsers, payload.userName, payload.userName)
    },
    userLeft(state, payload) {
      Vue.set(state.roomData.connectedUsers, payload, undefined)
    },
    addMessage(state, payload) {
      state.messages.push(payload)
    },
    leave(state) {
      state.joined = false,
        state.name = '',
        state.messages = [],
        state.roomData = {}
    }
  },
  actions: {
    //sockets
    join({ commit, dispatch }, payload) {
      commit('setJoined', payload);
      dispatch('socket', payload)
    },
    socket({ commit, dispatch }, payload) {
      //establish connection with socket
      socket = io('//localhost:3000')


      //Register all listeners
      socket.on('CONNECTED', data => {
        console.log('Connected to socket')
        //connect to room 
        socket.emit('join', { name: payload })
      })

      socket.on('joinedRoom', data => {
        debugger
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
        debugger
        commit('addMessage', data)
      })
    },
    sendMessage({ commit, dispatch }, payload) {
      socket.emit('message', payload)
    },
    leaveRoom({ commit, dispatch }, payload) {
      socket.emit('leave')
      socket.close()
      commit('leave')
    },
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
    deletePost({ commit, dispatch }, postId) {
      api.delete('postss/' + postId)
        .then(res => {
          dispatch('getPost')
        })
    },

    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})
