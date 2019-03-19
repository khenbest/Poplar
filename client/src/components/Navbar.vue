<template>
  <div class="component">
    <nav class="navbar navbar-expand-md navbar-expand-lg poplarBG">
      <img class="poplarIMG" @click="goHome" src="../assets/poplarName.jpg">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="#">All Posts</a>
            <a class="nav-item nav-link" href="#">Friend Posts</a>
            <a class="nav-item nav-link" href="#">Profile</a>
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
  name: "component",
  data() {
    return {};
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
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
</style>