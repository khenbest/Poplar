<template>
  <div class="navComponent">
    <nav
      :class="$mq | mq({xs: 'navbar fixed-top poplarBG', sm: 'navbar fixed-top poplarBG', md: 'navbar fixed-top navbar-expand-lg poplarBG', lg: 'navbar fixed-top navbar-expand-lg poplarBG'})">
      <mq-layout mq="xs">
        <i class="far fa-plus-square fa-2x" @click="makePost()"></i>
      </mq-layout>
      <mq-layout mq="sm">
        <i class="far fa-plus-square fa-2x" @click="makePost()"></i>
      </mq-layout>
      <mq-layout mq="md">
        <img class="poplarIMG pr-2" href="#" @click="goHome()" src="../assets/poplarLogo.jpg">
      </mq-layout>
      <mq-layout mq="lg">
        <img class="poplarIMG pr-2" href="#" @click="goHome()" src="../assets/poplarLogo.jpg">
      </mq-layout>

      <img class="poplarIMG curs" href="#" @click="goHome(); activeClass = null;" src="../assets/poplarName.jpg">

      <mq-layout mq="xs">
        <i class="fas fa-sign-out-alt fa-2x" @click="logout()"></i>
      </mq-layout>
      <mq-layout mq="sm">
        <i class="fas fa-sign-out-alt fa-2x" @click="logout()"></i>
      </mq-layout>
      <mq-layout mq="md">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </mq-layout>
      <mq-layout mq="lg">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </mq-layout>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-4">
          <a class="nav-item nav-link curs" :class="{active : activeClass == 2}" @click="activeClass = 2; allPosts();">
            All
            Posts
          </a>
          <a class="nav-item nav-link curs" :class="{active : activeClass == 1}" @click="activeClass = 1; goPosts();">
            Friends
            Posts
          </a>
          <a class="nav-item nav-link curs" :class="{active : activeClass == 3}"
            @click="activeClass = 3; myProfile();">Profile</a>
          <a class="nav-item nav-link curs" :class="{active : activeClass == 5}"
            @click="activeClass = 5; makePost();">Make
            Post</a>
          <a class="nav-item nav-link curs" :class="{active : activeClass == 4}"
            @click="logout(); activeClass = null">Logout</a>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    name: "nav-component",
    data() {
      return {
        activeClass: null
      };
    },
    computed: {},
    methods: {
      goPosts() {
        this.$router.push({ path: '/posts/friendPosts/' })
      },
      goHome() {
        this.$router.push({ path: "/" });
      },
      logout() {
        this.$store.dispatch("logout");
      },
      allPosts() {
        this.$router.push({ path: '/' });
      },
      makePost() {
        this.$router.push({ path: '/makePost' })
      },
      myProfile() {
        this.$store.dispatch('getUser')
        this.$router.push({ path: '/posts/myProfile' })
      }
    },
    components: {}
  };
</script>

<style>
  .curs {
    cursor: pointer;
  }

  .poplarBG {
    background-color: #6496c7;
  }

  .poplarIMG {
    max-height: 5vh;
  }

  .poplarIMG:hover {
    cursor: pointer;
  }

  .fas:hover {
    cursor: pointer;
  }

  .active {
    color: rgb(1, 1, 157);
    border-bottom: 3px solid white;
  }

  a {
    color: white !important;
  }

  .far,
  .fas {
    color: white;
  }
</style>