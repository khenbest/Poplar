<template>
  <div class="board">
    {{board.title}}

    <list v-for="list in lists" :listData='list'></list>
  </div>
</template>

<script>
  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      }
    },
    props: ["boardId"]
  };
</script>