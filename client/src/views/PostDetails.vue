<template>
   <div class="postDetails">





      <chatroom :post="post" :participated="participated"></chatroom>
   </div>
</template>

<script>
   import Chatroom from "./Chatroom.vue"
   export default {
      name: "postDetails",
      beforeRouteLeave(to, from, next) {
         this.leave()
         next()
         // called when the route that renders this component is about to
         // be navigated away from.
         // has access to `this` component instance.
      },
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
         activePost() {
            return this.$store.state.activePost
         }

      },
      methods: {
         leave() {
            let payload = {
               name: this.name,
               postId: this.$route.params.postId
            }
            this.$store.dispatch('leaveRoom', payload)
         }
      },
      components: {
         Chatroom
      }
   }
</script>