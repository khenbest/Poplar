<template>
  <div class="board">
    {{board.title}}

    <list v-for="list in lists" :listData='list'></list>
  </div>
</template>

<script>
  export default {
    name: "board",
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      }
    },
    props: ["boardId"]
  };
</script>
