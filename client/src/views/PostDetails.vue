<template>
   <div class="postDetails">














      <chatroom :post="post" :participated="participated"></chatroom>
   </div>
</template>

<script>
   import Chatroom from "./Chatroom.vue"
   export default {
      name: "postDetails",
      // mounted() {
      //    this.$store.dispatch('getPost', this.postId)
      // },
      data() {
         return {}
      },
      computed: {
         post() {
            return this.$store.state.myPosts.find(post => post._id == this.$route.params.postId)
         },
         participated() {
            return this.$store.state.user.participated.find(participated => participated._id == this.$route.params.postId)
         },

      },
      methods: {},
      components: {
         Chatroom
      }
   }
</script>