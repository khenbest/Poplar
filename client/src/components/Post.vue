<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-3">
    <div class="row">
      <div class="col">
        <h4 class="username d-flex justify-content-center">{{post.user || 'Unknown'}}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-start">
        <h4 class="title">{{post.title}}</h4>
      </div>
    </div>
    <div class="row">
      <div v-if="!post.imgUrl2" class="col px-0">
        <img :src="post.imgUrl1" class="photo">
      </div>
      <div v-else class="col px-0">
        <img :src="post.imgUrl1" class="photo">
        <img :src="post.imgUrl2" class="photo">
      </div>
    </div>
    <div v-if="!showVotes" class="row mb-2 mt-2 justify-content-between">
      <div class="col">
        <button class="vote yes" @click="castVote(post._id, 'yes');">yes</button>
      </div>
      <div class="col">
        <button class="vote no" @click="castVote(post._id, 'no');">no</button>
      </div>
    </div>

    <!-- PROGRESS BAR GOES HERE -->
    <div v-else class="progress d-flex row">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
        :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
        {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar"
        :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">{{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>

      <div class="col-12 mt-2">
        <button class="chatroom" @click="chatroom()">Go to Chatroom!</button>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col d-flex justify-content-center">
        <h4 class="timestamp">{{post.createdAt| formatTime}}</h4>
      </div>
    </div>
    <button @click="deletePost(post._id)">Delete</button>
    <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->

  </div>
</template>

<script>
  import Moment from "moment";
  import Chatroom from "@/views/Chatroom.vue"
  export default {
    name: "post",
    props: ["post"],
    mounted() {

    },
    data() {
      return {
        x: 100,
        totalNo: 0,
        totalYes: 0,
        showVotes: false
      };
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      },
      castVote(postId, vote) {
        this.post.votes = this.post.votes || {}
        this.post.votes[this.user._id] = vote
        this.$store.dispatch("castVote", {
          endpoint: `posts/${postId}/vote`,
          data: { "vote": vote }
        });
        this.value()
        this.showVotes = true
      },
      value() {
        let votesArr = Object.values(this.post.votes || {}) || []
        votesArr.forEach(vote => {
          if (vote == 'yes') {
            this.totalYes++
          } else (
            this.totalNo++
          )
        })
      },
      chatroom() {
        this.$router.push({
          path: '/get' + this.post._id,
          name: 'postDetails',
          params: {
            postId: this.post._id
          }
        })
      }
    },
    components: {
      Chatroom
    },
    filters: {
      formatTime(date) {
        return Moment(String(date))
          .startOf("hour")
          .fromNow();
      }
    },
  };
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
</style>