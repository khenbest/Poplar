<template>
  <div class="posts">
    WELCOME TO THE POSTS!!!
    <button class="btn btn-outline-danger logout mr-3 shadow" @click="logout">Logout</button>
    <form @submit.prevent="addPost">
      <input type="text" placeholder="title" v-model="newPost.title" required>
      <input type="text" placeholder="Image URL" v-model="newPost.imgUrl1" required>
      <button type="submit">Create Post</button>
    </form>
    <div v-for="post in posts" :key="post._id">
      <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link>
      <button @click="deletePost(post._id)">DELETE POST</button>
    </div>
    <button @click="chatroom">Go to Chatroom!</button>
  </div>
</template>

<script>
  import Chatroom from "./Chatroom.vue"
  export default {
    name: "posts",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getPosts");
    },

    data() {
      return {
        newPost: {}
      };
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      }
    },
    methods: {
      addPost() {
        this.$store.dispatch("addPost", this.newPost);
      },
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      },
      chatroom() {
        this.$router.push({ name: 'postDetails' })
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      Chatroom
    }
  };
</script>