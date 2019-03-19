<template>
  <div class="posts">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addPost">
      <input type="text" placeholder="title" v-model="newPost.title" required>
      <input type="text" placeholder="description" v-model="newPost.description">
      <button type="submit">Create Post</button>
    </form>
    <div v-for="post in posts" :key="post._id">
      <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link>
      <button @click="deletePost(post._id)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
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
        newPost: {
          title: "",
          description: ""
        }
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
        this.newPost = { title: "", description: "" };
      },
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      }
    }
  };
</script>