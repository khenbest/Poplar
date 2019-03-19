<template>
   <div class="postDetails">
      <chatroom></chatroom>
   </div>
</template>

<script>
   import Chatroom from "./Chatroom.vue"
   export default {
      name: "postDetails",
      props: [],
      data() {
         return {}
      },
      computed: {},
      methods: {},
      components: {
         Chatroom
      }
   }
</script>