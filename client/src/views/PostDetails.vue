<template>
   <div
      :class="$mq | mq({xs: 'container-fluid margin-mobile', sm: 'container-fluid margin-mobile', md: 'container-fluid margin-comp', lg: 'container-fluid margin-comp'})">
      <div class="row">
         <div class="col-6 d-flex justify-content-start">
            <div class="text-center">
               <button class="btn back-btn" type="button" @click="$router.back()"><i
                     class="fas fa-chevron-left text-dark"></i> Back</button>
            </div>
         </div>
         <div class="col-6 d-flex justify-content-end">
            <button class="btn delete-btn" @click="deletePost(activePost._id)" v-if="userPost">Delete My Post</button>
         </div>
      </div>


      <div class="postDetails row justify-content-center">
         <div
            :class="$mq | mq({xs: 'col-12 mt-1  bottom-line', sm: 'col-12 mt-1  bottom-line', md: 'col-4 mt-3  bottom-line', lg: 'col-4 border offset-1  bottom-line'})">
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
            <div v-if="!activePost.imgUrl2" class="progress d-flex row justify"
               :class="$mq | mq({xs: '', sm: '', md: ' px-3', lg: ' mx-0'})">
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-yes" role="progressbar"
                  :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
                  {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-no" role="progressbar"
                  :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">
                  {{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
            </div>
            <div v-else="activePost.imgUrl2" class="progress d-flex row justify-content-center">
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-this" role="progressbar"
                  :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
                  {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
               <div class="progress-bar progress-bar-striped progress-bar-animated bar-that" role="progressbar"
                  :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">
                  {{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
               </div>
            </div>
            <div class="" style="font-size:20px;"
               :class="$mq | mq({xs: 'col-12 m-2', sm: 'col-12 m-2', md: 'col-12', lg: 'col-12'})">
               <h4 class="timestamp">{{activePost.createdAt| formatTime}}</h4>
            </div>
            <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
         </div>
         <div class=""
            :class="$mq | mq({xs: 'row justify-content-center mt-3', sm: 'row justify-content-center mt-3', md: 'col-6 mt-3', lg: 'col-6 mt-3'})">
            <mq-layout mq="xs" class="col-12 d-flex justify-content-center">
               <chatroom></chatroom>
            </mq-layout>

            <mq-layout mq="sm" class="col-12 d-flex justify-content-center">
               <chatroom></chatroom>
            </mq-layout>

            <mq-layout mq="md">
               <chatroom></chatroom>
            </mq-layout>

            <mq-layout mq="lg">
               <chatroom></chatroom>
            </mq-layout>
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
            x: 100,

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
         },
         userPost() {
            return this.$store.state.activePost.authorId == this.$store.state.user._id
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
   .margin-mobile {
      margin-top: 55px;
   }

   .margin-comp {
      margin-top: 66px;
   }

   .btn {
      background-color: #6496c7;
      border: none;
      border-radius: 50px;
      color: #FFF;
      padding: 0.5vh 4vw;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 15px;
      transition: all 0.1s linear;
   }

   .btn:hover {
      background-color: #3979b9;
      transform: scale(1.03, 1);
      box-shadow: 2px 2px 2px grey;
      color: white;
   }

   .btn:active {
      background-color: #36608a;
   }

   .back-btn {
      background-color: #6496c7;
   }

   .back-btn:hover {
      background-color: #3979b9;
   }

   .back-btn:active {
      background-color: #36608a;
   }

   .delete-btn {
      background-color: #e05757;
   }

   .delete-btn:hover {
      background-color: #e64646;
   }

   .delete-btn:active {
      background-color: #ce4e4e;
   }


   .fas {
      color: #FFF !important;
   }

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
      color: #8396a4;
      font-size: 0.9em;
      font-family: "Kalam", cursive;
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
      border-radius: 0 !important;
   }

   .bottom-line {
      border-bottom: #3c6ea0a1 solid 0.5px;
   }

   .photos {
      margin-right: 0;
      margin-left: 0;
      width: 50%;
   }
</style>