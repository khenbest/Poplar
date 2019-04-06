<template>
  <div id="app" class="bg-light">
    <navbar />
    <router-view />

    <mq-layout mq="xs">
      <div id='bottom-nav'
        :class="$mq | mq({xs: 'row mt-4 pt-5', sm: 'row mt-4 pt-5', md: 'row mt-4 pt-5', lg: 'row mt-4 pt-5'})">
        <div class="navbar fixed-bottom bg-white row justify-content-around">
          <a class="nav-item nav-link curs" @click="allPosts();"><i
              class=" fas fa-globe-americas filters fa-2x col=1"></i></a>
          <a class="nav-item nav-link curs" @click="goPosts();"><i class="fas fa-users filters fa-2x col-1"></i></a>
          <a class="nav-item nav-link curs" @click="myProfile();"><i class="fas fa-user filters fa-2x col-1"></i></a>
        </div>
      </div>
    </mq-layout>

    <mq-layout mq="sm">
      <div id='bottom-nav'
        :class="$mq | mq({xs: 'row mt-4 pt-5', sm: 'row mt-4 pt-5', md: 'row mt-4 pt-5', lg: 'row mt-4 pt-5'})">
        <div class="navbar fixed-bottom bg-white row justify-content-around">
          <a class="nav-item nav-link curs" @click="allPosts();"><i
              class=" fas fa-globe-americas filters fa-2x col=1"></i></a>
          <a class="nav-item nav-link curs" @click="goPosts();"><i class="fas fa-users filters fa-2x col-1"></i></a>
          <a class="nav-item nav-link curs" @click="myProfile();"><i class="fas fa-user filters fa-2x col-1"></i></a>
        </div>
      </div>
    </mq-layout>

  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    name: 'App',
    methods: {
      allPosts() {
        this.$router.push({ path: '/' });
      },
      myProfile() {
        this.$router.push({ path: '/posts/myProfile' })
      },
      goPosts() {
        this.$router.push({ path: '/posts/friendPosts/' })
      },
    },
    components: {
      Navbar
    }
  }
</script>

<style scoped>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .filters {
    color: #aaaaaa;
  }

  .filters:active {
    color: #3d6ea0
  }
</style>