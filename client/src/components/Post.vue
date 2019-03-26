<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-3">
    <div class="row d-flex justify-content-center">
      <div class="col d-flex justify-content-center">
        <h4 class="username mx-2">{{post.user || 'Unknown'}}</h4>
        <button class="mx-2" @click="follow(post.authorId)"><i class="fas fa-user-plus"></i> follow</button>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <h4 class="title">{{post.title}}</h4>
      </div>
    </div>
    <div class="row">
      <div v-if="!post.imgUrl2" class="col px-0">
        <img :src="post.imgUrl1" class="photo">
      </div>
      <div v-else class="col px-0" style="max-width: 481px">
        <img class="photos" :src="post.imgUrl1">
        <img class="photos" :src="post.imgUrl2">
      </div>
    </div>
    <div v-if="!showVotes && !post.imgUrl2" class="row mb-2 mt-2 justify-content-between">
      <div class="col">
        <button class="vote yes" @click="castVote(post._id, 'yes');">yes</button>
      </div>
      <div class="col">
        <button class="vote no" @click="castVote(post._id, 'no');">no</button>
      </div>
    </div>
    <div v-else-if="!showVotes && post.imgUrl2" class="row mb-2 mt-2 justify-content-between">
      <div class="col">
        <button class="vote this" @click="castVote(post._id, 'yes');">This</button>
      </div>
      <div class="col">
        <button class="vote that" @click="castVote(post._id, 'no');">That</button>
      </div>
    </div>


    <!-- PROGRESS BAR GOES HERE -->
    <div v-if="showVotes && !post.imgUrl2" class="progress d-flex row">
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-yes" role="progressbar"
        :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
        {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-no" role="progressbar"
        :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">{{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>

      <div class="col-12 mt-2">
        <button class="chatroom" @click="chatroom()">What Are People Saying?</button>
      </div>
    </div>


    <div v-else-if="showVotes && post.imgUrl2" class="progress d-flex row">
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-this" role="progressbar"
        :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
        {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-that" role="progressbar"
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
  import Chatroom from "@/components/Chatroom.vue"
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
        showVotes: false,
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
      addFollower() {

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
        this.$store.dispatch('setActivePost', this.post)
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