<template>
  <div class="login container-fluid vh-100">
    <div class="row align-content-center">
      <div class="col">
        <img :src="logo" id="logo">
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <img :src="name" id="name">
      </div>
    </div>

    <div class="row">
      <div class="col 12">
        <form v-if="loginForm" class="form-inline justify-content-center mb-2" @submit.prevent="loginUser">
          <input type="email" v-model="creds.email" class="form-control" placeholder="email">
          <input type="password" v-model="creds.password" class="form-control" placeholder="password">
          <button class="btn btn-outline-light form-control" type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register" class="form-inline justify-content-center mb-2">
          <input class="form-control" type="text" v-model="newUser.name" placeholder="name">
          <input class="form-control" type="email" v-model="newUser.email" placeholder="email">
          <input class="form-control" type="password" v-model="newUser.password" placeholder="password">
          <button class="btn btn-outline-light form-control" type="submit">Create Account</button>
        </form>
        <div class="action" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to Register</p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Post from '@/components/Post.vue'
  import router from '@/router.js'
  import logo from '@/assets/poplarLogo.jpg'
  import name from '@/assets/poplarName.jpg'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        logo,
        name
      };
    },
    mounted() {
      this.$store.dispatch("getPublicPosts")
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      posts() {
        return this.$store.state.posts
      }
    },
    components: {
      Post
    }
  };
</script>

<style scoped>
  .action {
    cursor: pointer;
  }

  #logo {
    max-width: 50vh;
    max-height: 20vh;
    margin-top: 20vh;
  }

  #name {
    max-width: 30vh;
    max-height: 20vh;
  }

  .login {
    height: 100vh;
    background-color: #6496c7;
  }

  p {
    color: white;
  }
</style>