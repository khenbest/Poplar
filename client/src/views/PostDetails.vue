<template>
   <div>
      <div class="row mt-5">
         <div class="text-center mt-5 ml-5">
            <button class="btn btn-outline-primary btn-lg" type="button" @click="$router.push({ name: 'posts' })"><i
                  class="fas fa-chevron-left text-dark"></i> Back to
               Posts</button>
         </div>
      </div>
      <div :class="$mq | mq({xs: 'postDetails', sm: 'postDetails', md: 'postDetails row', lg: 'postDetails row'})"
         id="addMargin">
         <div :class="$mq | mq({xs: 'col-12 mt-3', sm: 'col-6 mt-3', md: 'col-4 mt-3', lg: 'col-4 border offset-1'})">
            <div class="row d-flex flex-row">
               <div class="col">
                  <h4 class="username d-flex justify-content-center">{{activePost.user || 'Unknown'}}</h4>
               </div>
            </div>
            <div class="row">
               <div
                  :class="$mq | mq({xs: 'col d-flex justify-content-center', sm: 'col d-flex justify-content-center', md: 'col d-flex justify-content-center', lg: 'col d-flex justify-content-center'})">
                  <h4 class="title">{{activePost.title}}</h4>
               </div>
            </div>
            <div class="row">
               <div v-if="!activePost.imgUrl2" class="col px-0">
                  <img :src="activePost.imgUrl1" class="photo">
               </div>
               <div v-else class="col px-0 justify-content-center">
                  <img class="photos" :src="activePost.imgUrl1">
                  <img class="photos" :src="activePost.imgUrl2">
               </div>
            </div>
            <!-- PROGRESS BAR GOES HERE -->
            <div v-if="!activePost.imgUrl2" class="progress d-flex row">
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-yes h-25" role="progressbar"
                  :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
                  {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-no h-25" role="progressbar"
                  :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">
                  {{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
            </div>
            <div v-else="activePost.imgUrl2" class="progress d-flex row justify-content-center">
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-this h-25" role="progressbar"
                  :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
                  {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-that h-25" role="progressbar"
                  :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">
                  {{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
               <div class="col-12" style="font-size:20px;">
                  <h4 class="timestamp">{{activePost.createdAt| formatTime}}</h4>
               </div>
               <button class="btn btn-outline-primary px-4 mb-2" @click="deletePost(activePost._id)">Delete</button>
            </div>
            <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
         </div>
         <div class="col-6">
            <chatroom></chatroom>
         </div>
      </div>
   </div>
</template>

<script>
   import Moment from "moment";
   import Chatroom from "@/components/Chatroom.vue"
   export default {
      name: "postDetails",
      beforeRouteLeave(to, from, next) {
         this.leave()
         this.clearActivePost()
         next()
         // called when the route that renders this component is about to
         // be navigated away from. 
         // has access to `this` component instance.
      },
      beforeMount() {
         let refreshPostID = this.$route.params.postId
         this.$store.dispatch('getActivePost', refreshPostID)
      },
      data() {
         return {
            x: 100
         }
      },
      computed: {
         activePost() {
            return this.$store.state.activePost
         },
         totalNo() {
            let no = 0
            if (this.$store.state.activePost.votes) {
               let votesArr = Object.values(this.$store.state.activePost.votes || {}) || []
               votesArr.forEach(vote => {
                  if (vote != 'yes') {
                     no++
                  }
               })
            }
            return no
         },
         totalYes() {
            let yes = 0
            if (this.$store.state.activePost.votes) {
               let votesArr = Object.values(this.$store.state.activePost.votes || {}) || []
               votesArr.forEach(vote => {
                  if (vote == 'yes') {
                     yes++
                  }
               })
            }
            return yes
         }
      },
      methods: {
         deletePost(postId) {
            this.$store.dispatch("deletePost", postId);
         },
         leave() {
            let payload = {
               name: this.name,
               postId: this.$route.params.postId
            }
            this.$store.dispatch('leaveRoom', payload)
         },
         clearActivePost() {
            this.$store.dispatch('clearActivePost', {})
         },
         value() {
            let votesArr = Object.values(this.activePost.votes || {}) || []
            votesArr.forEach(vote => {
               if (vote == 'yes') {
                  this.totalYes++
               } else (
                  this.totalNo++
               )
            })
         },
      },
      components: {
         Chatroom
      }, filters: {
         formatTime(date) {
            return Moment(String(date))
               .startOf("hour")
               .fromNow();
         }
      }
   }
</script>


<style scoped>
   .username {
      color: #a0b5c5;
      font-family: "Amatic SC", cursive;
      margin-bottom: -0.2em;
   }

   .title {
      color: #3d6ea0;
      font-family: "Patrick Hand SC", cursive;
      margin-bottom: -0.05em;
   }

   img {
      max-width: 100%;
      margin-left: -15px;
      margin-right: -15px;
   }

   .yes {
      background-color: #95c701;
   }

   .no {
      background-color: #fe3231;
   }

   .this {
      background-color: #a0b5c4;
   }

   .that {
      background-color: #3c6ea0;
   }

   .progress-bar {
      border-radius: none;
   }

   .bar-yes {
      background-color: #95c701;
   }

   .bar-no {
      background-color: #fe3231;
   }

   .bar-this {
      background-color: #a0b5c4;
   }

   .bar-that {
      background-color: #3c6ea0;
   }

   .vote {
      border: none;
      color: white;
      font-size: 1.5em;
      min-width: 5em;
      min-height: 1em;
      font-family: "Kalam", cursive;
   }

   .timestamp {
      color: #3d6ea0;
      font-size: 1em;
   }

   .filters {
      color: #c2c2c3;
   }

   .filters:active {
      color: #3d6ea0;
   }

   .fas:hover {
      cursor: pointer;
   }

   .progress {
      height: 10vh;
   }

   .photos {
      margin-right: 0;
      margin-left: 0;
      width: 50%;
   }
</style>