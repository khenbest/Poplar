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
  timeout: 8000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 8000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    posts: [],
    myPosts: [],
    filteredPosts: [],
    activePost: {},
    joined: false,
    name: '',
    messages: [],
    roomData: {},
    allUsers: [],
    pageNum: 1
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setFollower(state, follower) {
      state.allUsers.forEach((user, index) => {
        if (user._id == follower._id) {
          state.allUsers.splice(index, 1)
          state.allUsers.push(user)
        }
      })
    },
    setUsers(state, users) {
      state.allUsers = users
    },
    deletePost(state, postId) {
      let deleted = state.myPosts.findIndex(post => post._id == postId)
      state.myPosts.splice(deleted, 1)
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    UpdatePost(state, post) {
      let i = state.posts.findIndex(p => p._id == post._id)
      if (i == -1) { return "Unable to update a post that doesnt exist" }
      return state.posts.splice(i, 1, post)
    },
    setFiltered(state, posts) {
      state.filteredPosts = posts
    },
    setMyPosts(state, posts) {
      state.myPosts = posts
    },
    setActivePost(state, data) {
      state.activePost = data
    },
    setPageNum(state, val) {
      state.pageNum = val
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
    // @ts-ignore
    socket({ commit, dispatch }, payload) {
      //establish connection with socket
      socket = io('//poplr.herokuapp.com')
      //Register all listeners
      // @ts-ignore
      socket.on('CONNECTED', data => {

        //connect to room 
        socket.emit('join', {
          name: payload.name,
          postId: payload.postId
        })
      })
      socket.on('joinedRoom', data => {
        commit('setRoom', data)
      })

      socket.on('newUser', data => {
        commit('newUser', data)
      })

      socket.on('left', data => {
        commit('userLeft', data)
      })

      socket.on('newMessage', data => {
        commit('addMessage', data)
      })

      socket.on('roomHistory', messages => {
        commit('setMessages', messages)
      })

      socket.on('messageError', err => {
      })
    },
    // @ts-ignore
    sendMessage({ commit, dispatch }, payload) {
      socket.emit('message', payload)
    },
    // @ts-ignore
    leaveRoom({ commit, dispatch }, payload) {
      socket.emit('leave', payload)
      socket.close()
      commit('leave', payload)
    },
    //#endregion
    // @ts-ignore
    getUser({ commit, dispatch }, payload) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
        })
    },
    // @ts-ignore
    getUsers({ commit, dispatch }) {
      api.get('users/all')
        .then(res => {
          commit('setUsers', res.data)
        })
    },
    // @ts-ignore
    addFollow({ commit, dispatch }, payload) {
      // if(this.state.following.find(post => post == payload))
      api.put('users/follow/' + payload.toFollow, payload)
        .then(res => {
          dispatch("getUser")
          dispatch("getUsers")
        })
    },
    // @ts-ignore
    unfollow({ commit, dispatch }, payload) {
      api.put('users/unfollow/' + payload.toUnfollowId, payload)
        .then(res => {
          dispatch("getUser")
          dispatch("getUsers")
        })
    },
    //#region -- AUTH STUFF --
    // @ts-ignore
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'posts' })
        })
    },
    // @ts-ignore
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
        })
        // @ts-ignore
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    // @ts-ignore
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'posts' })
        }).catch(err => {
          window.alert("We're sorry, you have entered invalid information. Please try again.")
        })
    },
    // @ts-ignore
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'login' })
        })
    },

    //#endregion
    //#region -- SORT --
    // @ts-ignore
    activity({ commit, dispatch }) {
      // @ts-ignore
      let sorted = this.state.posts.sort((a, b) => {
        return Object.values(b.votes).length - Object.values(a.votes).length
      })
      commit('setFiltered', sorted)
    },
    // @ts-ignore
    oldest({ commit, dispatch }) {
      // @ts-ignore
      let sorted = this.state.posts.sort((a, b) => {
        // @ts-ignore
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
      commit('setPosts', sorted)
    },
    // @ts-ignore
    newest({ commit, dispatch }) {
      // @ts-ignore
      let sorted = this.state.posts.sort((a, b) => {
        // @ts-ignore
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      commit('setPosts', sorted)
    },

    // @ts-ignore
    filterUser({ commit, dispatch }, payload) {
      // @ts-ignore
      let filtered = this.state.posts.filter(post => {
        return post.user.toLowerCase() == payload.toLowerCase()
      })
      commit('setFiltered', filtered)
    },
    // @ts-ignore
    filterTags({ commit, dispatch }, payload) {
      if (!payload) {
        // @ts-ignore
        let filtered = this.state.posts
        commit('setFiltered', filtered)
      } else {
        // @ts-ignore
        let filtered = this.state.posts.filter(post => {
          return post.tags == payload
        })
        commit('setFiltered', filtered)
      }
    },
    // @ts-ignore
    yesNo({ commit, dispatch }) {
      // @ts-ignore
      let filtered = this.state.posts.filter(post => {
        return !post.imgUrl2
      })
      commit('setFiltered', filtered)
    },
    // @ts-ignore
    thisThat({ commit, dispatch }) {
      // @ts-ignore
      let filtered = this.state.posts.filter(post => {
        return post.imgUrl2
      })
      commit('setFiltered', filtered)
    },
    // @ts-ignore
    reset({ commit, dispatch }) {
      // @ts-ignore
      let sorted = this.state.posts.sort((a, b) => {
        // @ts-ignore
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      commit('setPosts', sorted)
    },
    //#endregion
    //#region -- POSTS --

    //#region -- POSTS
    // @ts-ignore
    getPosts({ commit, dispatch }, pageNum = 1) {
      let query = 'posts?pageNum=' + pageNum
      return api.get(query)
        .then(res => {
          let addVotes = res.data.map(post => {
            if (!post.votes) {
              post.votes = {}
            }
            return post
          })
          commit('setPosts', addVotes.sort((a, b) => {
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt)
          }))
        })
    },
    // @ts-ignore
    getMyPosts({ commit, dispatch }, pageNum = 1) {
      let query = 'posts/myPosts?pageNum=' + pageNum
      return api.get(query)
        .then(res => {
          commit('setMyPosts', res.data)
        })
    },
    // @ts-ignore
    clearActivePost({ commit, dispatch }, object) {
      commit('setActivePost', object)
    },
    // @ts-ignore
    getActivePost({ commit, dispatch }, postId) {
      api.get('posts/get/' + postId)
        .then(res => {
          commit('setActivePost', res.data)
        })
    },
    // @ts-ignore
    addPost({ commit, dispatch }, postData) {
      api.post('posts', postData)
        .then(serverPost => {
          dispatch('getPosts')
        })
    },
    // @ts-ignore
    deletePost({ commit, dispatch }, postId) {
      api.delete('posts/' + postId)
        // @ts-ignore
        .then(res => {
          commit('deletePost', postId)
        })
    },
    // @ts-ignore
    castVote({ commit, dispatch }, payload) {
      api.put(payload.endpoint, payload.data)
        .then(res => {
          commit('setUser', res.data.user)
          commit('UpdatePost', res.data.post)
        })
    }
    //#endregion
  },
  getters: {
    participated(state) {
      let mine = state.posts.filter(p => p.votes[state.user._id])
      return mine || []
    }
  }
})
