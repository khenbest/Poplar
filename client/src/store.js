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
  timeout: 100000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 100000,
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
    allUsers: []
  },
  mutations: {
    // remFollow(state, user) {
    //   state.following.forEach((user1, index) => {
    //     if (user.name._id == user1._id)
    //       state.following.splice(index, 1)
    //   })
    // },
    // following(state, user) {
    //   let newArray = []
    //   debugger
    //   state.user.following.forEach(id => {
    //     let user = state.allUsers.find(user => user._id == id)
    //     newArray.push(user)
    //   })
    //   state.following = newArray
    // },
    // followers(state, user) {
    //   let newArray = []
    //   if (!state.user.followedBy) {
    //     state.user['followedBy'] = []
    //   }
    //   state.user.followedBy.forEach(id => {
    //     let user = state.allUsers.find(user => user._id == id)
    //     newArray.push(user)
    //   })
    //   state.followedBy = newArray
    // },
    // setFollowing(state, user) {
    //   console.log(user)
    //   dispatch('getUser')
    // },
    // setFollowers(state, user) {
    //   state.followers.push(user)
    //   if (!state.allUsers.) {
    //     state.user['followers'] = []
    //   }
    //   state.user.followers.push(user)
    // },
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
    setPosts(state, posts) {
      state.posts = posts
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
      console.log('left room')
    },
    //#endregion
    getUser({ commit, dispatch }, payload) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'posts' }) //reroutes to posts upon refresh
        })
    },
    getUsers({ commit, dispatch }) {
      api.get('users/all')
        .then(res => {
          commit('setUsers', res.data)
        })
    },
    addFollow({ commit, dispatch }, payload) {
      // if(this.state.following.find(post => post == payload))
      api.put('users/follow/' + payload.toFollow, payload)
        .then(res => {
          console.log(res.data)
          commit('setUser', res.data.user)
          commit('setFollower', res.data.follower)
          dispatch('getUsers')
        })
    },
    unfollow({ commit, dispatch }, payload) {
      console.log(payload)
      api.put('users/unfollow/' + payload.toUnfollowId, payload)
        .then(res => {
          console.log(res.data)
          commit('setUser', res.data.user)
          commit('setFollower', res.data.follower)
          dispatch('getUsers')
        })
    },
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
          // router.push({ name: 'posts' }) //reroutes to posts upon refresh
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
    //#region -- SORT --
    activity({ commit, dispatch }) {
      let sorted = this.state.posts.sort((a, b) => {
        return Object.values(b.votes).length - Object.values(a.votes).length
      })
      commit('setFiltered', sorted)
    },
    oldest({ commit, dispatch }) {
      let sorted = this.state.posts.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
      commit('setPosts', sorted)
    },
    filterUser({ commit, dispatch }, payload) {
      let filtered = this.state.posts.filter(post => {
        return post.user.toLowerCase() == payload.toLowerCase()
      })
      commit('setFiltered', filtered)
    },
    filterTags({ commit, dispatch }, payload) {
      if (payload == '') {
        return this.state.posts

      } else {
        let filtered = this.state.posts.filter(post => {
          return post.tags == payload
        })
        console.log(filtered)
        commit('setFiltered', filtered)
      }
    },
    yesNo({ commit, dispatch }) {
      let filtered = this.state.posts.filter(post => {
        return !post.imgUrl2
      })
      commit('setFiltered', filtered)
    },
    thisThat({ commit, dispatch }) {
      let filtered = this.state.posts.filter(post => {
        return post.imgUrl2
      })
      commit('setFiltered', filtered)
    },
    reset({ commit, dispatch }) {
      let sorted = this.state.posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      commit('setPosts', sorted)
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
          let addVotes = res.data.map(post => {
            if (!post.votes) {
              post.votes = {}
            }
            return post
          })
          commit('setPosts', addVotes.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }))
        })
    },
    getFollowing({ commit, dispatch }) {
      commit('following')
    },
    getFollowers({ commit, dispatch }) {
      commit('followers')
    },
    getMyPosts({ commit, dispatch }, myPosts) {
      let query = 'posts'
      if (myPosts) {
        query += '/myPosts'
      }
      api.get(query)
        .then(res => {
          commit('setMyPosts', res.data)
        })
      console.log(query)
    },
    clearActivePost({ commit, dispatch }, object) {
      commit('setActivePost', object)
    },
    getActivePost({ commit, dispatch }, postId) {
      api.get('posts/get/' + postId)
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
