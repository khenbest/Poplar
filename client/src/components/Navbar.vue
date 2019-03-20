<template>
  <!-- CHANGED COMPONENT TO NAVBARCOMPONENT TO AVOID CONSOLE ERROR -->
  <div class="navbarComponent">



    <nav class="navbar navbar-expand-md navbar-expand-lg poplarBG">
      <i class="fas fa-plus fa-2x"></i>
      <img class="poplarIMG" @click="goHome" src="../assets/poplarName.jpg">

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="#">All Posts</a>
            <a class="nav-item nav-link" href="#">Friend Posts</a>
            <a class="nav-item nav-link" href="#">Profile</a>
          </div>
        </div>
      </div>
      <i class="fas fa-sign-out-alt fa-2x" @click="logout"></i>
      <!-- <i class="fas fa-user"></i> -->
      <!-- <i class="fas fa-users"></i> -->
    </nav>



    <!-- COMMENTED OUT TO USE FOR MEDIA QUERY PORTER SHOWED US -->
    <!-- <nav class="navbar navbar-expand-md navbar-expand-lg poplarBG">
      <img class="poplarIMG" @click="goHome" src="../assets/poplarName.jpg">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="#">All Posts</a>
            <a class="nav-item nav-link" href="#">Friend Posts</a>
            <a class="nav-item nav-link" href="#">Profile</a>
            <button class="btn btn-outline-danger logout mr-3 shadow" @click="logout">Logout</button>
          </div>
        </div>
      </div>
      <!-- <i class="fas fa-user"></i> -->
    <!-- <i class="fas fa-users"></i> -->
    </nav>
  </div>
</template>
<script>
  export default {
    name: "navbarComponent",
    data() {
      return {};
    },
    computed: {},
    methods: {
      goHome() {
        this.$router.push({ path: "/" });
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {}
  };
</script>


<style scoped>
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

  .fas {
    color: white;
  }
</style>