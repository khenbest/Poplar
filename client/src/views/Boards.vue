<template>
  <div class="boards">

  </div>
</template>

<script>
export default {
  name: "boards",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>