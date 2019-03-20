<template>
  <div class="post row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-3" v-for="post in posts">
      <div class="row">
        <div class="col">
          <h4 class="username">__________{{post.user || 'Unknown'}}__________</h4>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-start">
          <h4 class="title">{{post.title}}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col px-0">
          <img :src="post.imgUrl1" class="photo">
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
      <!-- <button @click="deletePost(post._id)">Delete</button> -->
      <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
    </div>
  </div>
</template>

<script>
import Moment from "moment";

export default {
  name: "post",
  props: [],
  data() {
    return {};
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    deletePost(postId) {
      this.$store.dispatch("deletePost", postId);
    },
    castVote(vote) {
      debugger;
      let postId = this.post.id;

      console.log(postId);
      this.$store.dispatch("castVote", {
        endpoint: "posts/${postId}"
      });
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