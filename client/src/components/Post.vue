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
    <div class="row mb-2 mt-2 justify-content-between">
      <div class="col">
        <button class="vote yes" @click="castVote(post._id, 'yes')">yes</button>
      </div>
      <div class="col">
        <button class="vote no" @click="castVote(post._id, 'no')">no</button>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col d-flex justify-content-center">
        <h4 class="timestamp">{{post.createdAt| formatTime}}</h4>
      </div>
    </div>
    <button @click="deletePost(post._id)">Delete</button>
    <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->

    <!-- PROGRESS BAR GOES HERE -->
    <button @click="go(10)">up</button>
    <button @click="go(-10)">down</button>
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{width: x + '%'}">
        math.floor(% amount yes/total)
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar"
        :style="{width: 100-x + '%'}">math.floor(% amount no/total)</div>
    </div>


  </div>
</template>



<script>
  import Moment from "moment";

  export default {
    name: "post",
    props: ["post"],
    data() {
      return {
        x: 100
      };
    },
    computed: {
    },
    methods: {
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      },
      castVote(postId, vote) {
        this.$store.dispatch("castVote", {
          endpoint: `posts/${postId}/vote`,
          data: { "vote": vote }
        });
      },
      go(n) {
        this.x += n;
      }
    },
    components: {},
    filters: {
      formatTime(date) {
        return Moment(String(date))
          .startOf("hour")
          .fromNow();
      }
    }
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

  /* TEMPORARY STYLING FOR TEMPORARY CHATROOM BUTTON */
  .chatroom {
    border: none;
    background-color: #3d6ea0;
    color: white;
    border-radius: 25px;
    font-size: 1.5em;
    min-width: 5em;
    min-height: 1em;
    font-family: "Kalam", cursive;
  }

  /* font-family: 'Amatic SC', cursive;
font-family: 'Patrick Hand SC', cursive;
font-family: 'Dekko', cursive;
font-family: 'Itim', cursive;
font-family: 'Kalam', cursive;
font-family: 'Just Me Again Down Here', cursive; */
</style>