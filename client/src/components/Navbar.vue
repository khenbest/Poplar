<template>
  <div class="navComponent">
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark poplarBG">
      <img class="poplarIMG pr-2" href="#" src="../assets/poplarLogo.jpg">
      <img class="poplarIMG" href="#" @click="goHome(); activeClass = null;" src="../assets/poplarName.jpg">
      <div>

      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-4">
          <a class="nav-item nav-link" :class="{active : activeClass == 2}" @click="activeClass = 2; allPosts();">
            All
            Posts
          </a>
          <a class="nav-item nav-link" :class="{active : activeClass == 1}" @click="activeClass = 1; ">
            Friend
            Posts
          </a>
          <a class="nav-item nav-link" :class="{active : activeClass == 3}"
            @click="activeClass = 3; friendPosts();">Profile</a>
          <a class="nav-item nav-link" :class="{active : activeClass == 4}"
            @click="logout(); activeClass = null">Logout</a>
          <a class="nav-item nav-link" :class="{active : activeClass == 5}" @click="activeClass = 5; makePost();">Make
            Post</a>
        </ul>
      </div>
    </nav>
    <!-- <i class="fas fa-user"></i> -->
    <!-- <i class="fas fa-users"></i> -->
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
      goHome() {
        this.$router.push({ path: "/" });
      },
      logout() {
        this.$store.dispatch("logout");
      },
      profile() {
        this.$router.push({ path: '/profile' });
      },
      allPosts() {
        this.$router.push({ path: '/' });
      },
      makePost() {
        this.$router.push({ path: '/makePost' })
      },
      friendPosts() {
        this.$router.push({ path: '/posts/myPosts' })
      }
    },
    components: {}
  };
</script>


<style>
  .poplarBG {
    background-color: #6496c7;
  }

  .poplarIMG {
    max-height: 5vh;
  }

  .poplarIMG:hover {
    cursor: pointer;
  }

  .active {
    color: black;
  }

  .fas:hover {
    cursor: pointer;
  }

  .active {
    color: rgb(1, 1, 157);
    border-bottom: 3px solid rgb(51, 51, 211);
  }

  a {
    color: white !important;
  }
</style>