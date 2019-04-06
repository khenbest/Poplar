<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="row d-flex justify-content-center">
      <div class="col d-flex justify-content-center">
        <h4 :class="$mq | mq({xs: 'username mx-2', sm: 'username mx-2', md: 'username mx-2', lg: 'username mx-2'})"
          @click="
          goProfile(post.authorId)">{{post.user || 'Unknown'}}</h4>
        <!-- <button class="mx-2 btn btn" @click="addFollow(post.authorId)"><i class="fas fa-user-plus"></i> follow</button> -->
      </div>
    </div>
    <div class="row">
      <div v-if="post.title.length < 28" class="col d-flex justify-content-center">
        <h4 class="title">{{post.title}}</h4>
      </div>
      <div v-else class="col d-flex justify-content-left">
        <h4 class="title">{{post.title.substring(0,31)}}...</h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-if="!post.imgUrl2" :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})">
        <img :src="post.imgUrl1" :class="$mq | mq({xs: 'photo', sm: 'photo', md: 'photo', lg: 'photo'})">
      </div>
      <div v-else :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})"
        :style="$mq | mq({xs: 'max-width: 481px', sm: 'max-width: 481px', md: '', lg: ''})">
        <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})" :src="post.imgUrl1">
        <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})" :src="post.imgUrl2">
      </div>
    </div>
    <div v-if="!showVotes && !post.imgUrl2"
      :class="$mq | mq({xs: 'row mb-2 mt-2 justify-content-between', sm: 'row mb-2 mt-2 justify-content-between', md: 'row mb-2 mt-2 justify-content-between', lg: 'row mb-2 mt-2 justify-content-between'})">
      <div class="col">
        <button class="vote yes" @click="castVote(post._id, 'yes');">yes</button>
      </div>
      <div class="col">
        <button class="vote no" @click="castVote(post._id, 'no');">no</button>
      </div>
    </div>
    <div v-else-if="!showVotes && post.imgUrl2"
      :class="$mq | mq({xs: 'row mb-2 mt-2 justify-content-between', sm: 'row mb-2 mt-2 justify-content-between', md: 'row mb-2 mt-2 justify-content-between', lg: 'row mb-2 mt-2 justify-content-between'})">
      <div class="col">
        <button class="vote this" @click="castVote(post._id, 'yes');">This</button>
      </div>
      <div class="col">
        <button class="vote that" @click="castVote(post._id, 'no');">That</button>
      </div>
    </div>

    <!-- PROGRESS BAR GOES HERE -->
    <div v-if="showVotes && !post.imgUrl2"
      :class="$mq | mq({xs: 'd-flex row', sm: 'd-flex row', md: 'd-flex row', lg: 'd-flex row'})">
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-yes" role="progressbar"
        :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
        {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-no" role="progressbar"
        :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">{{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>

      <div
        :class="$mq | mq({xs: 'col-12 mt-2', sm: 'col-12 mt-2', md: 'col-12 mt-2 border-left border-right border-bottom', lg: 'col-12 mt-2 border-left border-right border-bottom'})">
        <button
          :class="$mq | mq({xs: 'chatroom mt-2 p-2 rounded', sm: 'chatroom mt-2 p-2 rounded', md: 'chatroom mt-2 p-2 rounded', lg: 'chatroom mt-2 p-2 rounded'})"
          @click="chatroom()">What Are People Saying?</button>
      </div>
    </div>

    <div v-else-if="showVotes && post.imgUrl2"
      :class="$mq | mq({xs: 'd-flex row', sm: 'd-flex row', md: 'd-flex row', lg: 'd-flex row'})">
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-this" role="progressbar"
        :style="{width: (totalYes/(totalYes + totalNo) *100) + '%'}">
        {{(totalYes/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>
      <div class="progress-bar progress-bar-striped progress-bar-animated bar-that" role="progressbar"
        :style="{width: (totalNo/(totalYes + totalNo) *100) + '%'}">{{(totalNo/(totalYes + totalNo) *100).toFixed(0)}}%
      </div>

      <div
        :class="$mq | mq({xs: 'col-12 mt-2', sm: 'col-12 mt-2', md: 'col-12 mt-2 border-left border-right border-bottom', lg: 'col-12 mt-2 border-left border-right border-bottom'})">
        <button
          :class="$mq | mq({xs: 'chatroom mt-2 p-2 rounded', sm: 'chatroom mt-2 p-2 rounded', md: 'chatroom mt-2 p-2 rounded', lg: 'chatroom mt-2 p-2 rounded'})"
          @click="chatroom()">What Are People Saying?</button>
      </div>
    </div>

    <div
      :class="$mq | mq({xs: 'row pb-1 mb-3 bottom-line', sm: 'row pb-1 mb-3 bottom-line', md: 'row mb-2', lg: 'row mb-2'})">
      <div class="col d-flex justify-content-center">
        <h4 class="timestamp">{{post.createdAt| formatTime}}</h4>
      </div>
    </div>
    <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
  </div>
</template>

<script>
  import Moment from "moment";
  import Chatroom from "@/components/Chatroom.vue";
  export default {
    name: "post",
    props: ["post"],
    mounted() {
      if (
        this.user.participated.find(post => {
          return post._id == this.post._id;
        })
      ) {
        this.showVotes = true;
      }
    },
    data() {
      return {
        x: 100,
        showVotes: false
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      totalNo() {
        let no = 0;
        if (this.post.votes) {
          let votesArr = Object.values(this.post.votes || {}) || [];
          votesArr.forEach(vote => {
            if (vote != "yes") {
              no++;
            }
          });
        }
        return no;
      },
      totalYes() {
        let yes = 0;
        if (this.post.votes) {
          let votesArr = Object.values(this.post.votes || {}) || [];
          votesArr.forEach(vote => {
            if (vote == "yes") {
              yes++;
            }
          });
        }
        return yes;
      }
    },
    methods: {
      goProfile(user) {
        console.log(user);
        this.$router.push({
          path: "/posts/profile/" + user,
          name: "friendProfile",
          params: {
            id: user
          }
        });
      },
      addFollow(author) {
        let payload = {
          user: this.user._id,
          name: author
        };
        this.$store.dispatch("addFollow", payload);
      },
      castVote(postId, vote) {
        this.post.votes = this.post.votes || {};
        this.post.votes[this.user._id] = vote;
        this.$store.dispatch("castVote", {
          endpoint: `posts/${postId}/vote`,
          data: { vote: vote }
        });
        this.value();
        this.showVotes = true;
      },
      value() {
        let votesArr = Object.values(this.post.votes || {}) || [];
        votesArr.forEach(vote => {
          if (vote == "yes") {
            this.totalYes++;
          } else this.totalNo++;
        });
      },
      chatroom() {
        this.$store.dispatch("setActivePost", this.post);
        this.$router.push({
          path: "/get" + this.post._id,
          name: "postDetails",
          params: {
            postId: this.post._id
          }
        });
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
    }
  };
</script>
<style scoped>
  .username {
    color: #a0b5c5;
    font-family: "Amatic SC", cursive;
    margin-bottom: -0.2em;
    transition: all 0.3s linear;
  }

  .username:hover {
    border-bottom: 0.2px solid #a0b5c5;
    color: #3d6ea0;
    cursor: pointer;
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
    background-color: #719700c1;
  }

  .bar-no {
    background-color: #aa0000be;
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

  .bottom-line {
    border-bottom: #3c6ea0a1 solid 0.5px;
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

  .photos2 {
    margin-right: 0;
    margin-left: 0;
    width: 50%;
  }
</style>