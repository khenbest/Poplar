<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col">
        <img :src="logo" id="logo">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img :src="name" id="name">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <input type="email" v-model="creds.email" placeholder="email">
          <input type="password" v-model="creds.password" placeholder="password">
          <button type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name">
          <input type="email" v-model="newUser.email" placeholder="email">
          <input type="password" v-model="newUser.password" placeholder="password">
          <button type="submit">Create Account</button>
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
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
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
  }

  #name {
    max-width: 30vh;
    max-height: 20vh;
  }

  body {
    background-color: #6496c7;
  }
</style>