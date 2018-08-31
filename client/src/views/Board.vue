<template>
  <div class="board">
  </div>
</template>

<script>
export default {
  name: "board",
  created(){
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  props: ['boardId']
};
</script>