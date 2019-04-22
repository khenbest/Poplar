<template>
  <div id="app">
    <navbar v-if="$route.name != 'login'" />

    <router-view />

    <mq-layout mq="xs">
      <div id='bottom-nav'
        :class="$mq | mq({xs: 'row py-0', sm: 'row py-0', md: 'row mt-4 pt-5', lg: 'row mt-4 pt-5'})">
        <div style="font-size: 20px" class="py-0  navbar fixed-bottom bg-white row justify-content-around">
          <a class="py-0 nav-item nav-link curs" @click="allPosts();"><i
              class=" fas fa-globe-americas filters fa-lg col=1"></i></a>
          <a class="py-0 nav-item nav-link curs" @click="goPosts();"><i
              class="fas fa-users filters fa-lg col-1"></i></a>
          <a class="py-0 nav-item nav-link curs" @click="myProfile();"><i
              class="fas fa-user filters fa-lg col-1"></i></a>
        </div>
      </div>
    </mq-layout>

    <mq-layout mq="sm">
      <div id='bottom-nav'
        :class="$mq | mq({xs: 'row  py-0', sm: 'row py-0', md: 'row mt-4 pt-5', lg: 'row mt-4 pt-5'})">
        <div style="font-size: 20px" class="py-0 navbar fixed-bottom bg-white row justify-content-around">
          <a class="py-0 nav-item nav-link curs" @click="allPosts();"><i
              class=" fas fa-globe-americas filters fa-lg col=1"></i></a>
          <a class="py-0 nav-item nav-link curs" @click="goPosts();"><i
              class="fas fa-users filters fa-lg col-1"></i></a>
          <a class="py-0 nav-item nav-link curs" @click="myProfile();"><i
              class="fas fa-user filters fa-lg col-1"></i></a>
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
    overflow: hidden;
  }
</style>