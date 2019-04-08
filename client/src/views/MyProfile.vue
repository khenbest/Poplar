<template>
  <div class="posts container-fluid" id="addMargin">
    <div class="row d-flex align-items-center bg-light text-center">
      <div class="col-12">
        <!-- FILTERS -->
        <!-- POST CARDS -->
        <div id="btn-bar" class="row d-flex justify-content-center">
          <div class="row d-flex justify-content-center">
            <button class="btn btn-my" @click="showPosts = true">My Posts</button>
            <button class="btn btn-my" @click="showPosts = false">
              My
              Participated Posts
            </button>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <h1 id="changeFont">{{this.$store.state.user.name}}'s Profile</h1>
        </div>
        <div class="row d-flex justify-content-center" id="changeFont">
          <h3>Member Since: {{this.$store.state.user.createdAt | formatTime2}}</h3>
        </div>
        <div class="col-2">
          <h6>Following:</h6>
        </div>
        <div class="card col-2">
          <div v-for="follows in followedBy">
            <li class="username text-dark text-left p-2" @click="goProfile(follows)">{{follows.name}}</li>

          </div>
        </div>
        <div class="col-2">
          <h6>Followers:</h6>
        </div>
        <div class="card col-2">
          <div v-for="follows in following">
            <li class="username text-dark text-left p-2" @click="goProfile(follows)">{{follows.name}}</li>
          </div>
        </div>
        <span v-show="showPosts">
          <div class="row">
            <div id="post" class="col-xs-12 col-sm-6 col-md-3 m-2" v-for="post in posts" :key="post._id">
              <div class="row">
                <div class="col d-flex justify-content-center">
                  <h4 class="title">{{post.title}}</h4>
                </div>
              </div>
              <div class="row">
                <div class="col px-0">
                  <img :src="post.imgUrl1" class="photo">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col d-flex justify-content-center">
                  <h4 class="timestamp">{{post.createdAt| formatTime}}</h4>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <button class="chatroom" @click="chatroom(post._id)">What Are People Saying?</button>
              </div>
              <button @click="deletePost(post._id)">Delete</button>
            </div>
          </div>
        </span>
        <span v-show="!showPosts">
          <div class="row">
            <div class="col-12">
              <!-- <h3>Total Participated: {{this.$store.state.user.participated.length}}</h3> -->
            </div>
          </div>
          <div class="row">
            <div id="post" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 m-2"
              v-for="(participated, index) in participated" :key="index">
              <div class="row">
                <div class="col">
                  <h4 class="username d-flex justify-content-center">{{participated.user || 'Unknown'}}</h4>
                </div>
              </div>
              <div class="row">
                <div class="col d-flex justify-content-center">
                  <h4 class="title">{{participated.title}}</h4>
                </div>
              </div>
              <div class="row">
                <div class="col px-0">
                  <img :src="participated.imgUrl1" class="photo">
                </div>
              </div>
              <div class="row mb-2">
                <div class="col d-flex justify-content-center">
                  <h4 class="timestamp">{{participated.createdAt| formatTime}}</h4>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <button class="chatroom" @click="chatroom(participated._id)">What Are People Saying?</button>
              </div>
              <button @click="deletePost(post._id)">Delete</button>
            </div>
          </div>
        </span>
        <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Moment from "moment";
  import Chatroom from "@/components/Chatroom.vue";

  export default {
    name: "posts",
    props: ["post"],
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getUser")
        .then(
          this.$store.dispatch("getMyPosts", true),
          this.$store.dispatch("getUsers"))
    },
    data() {
      return {
        showPosts: true,
        newPost: {},
        activeClass: null
      }
    },
    computed: {
      posts() {
        return this.$store.state.myPosts;
      },
      participated() {
        return this.$store.state.user.participated;
      },
      following() {
        let user = this.$store.state.user
        let followedByArray = []
        let followedBy = user.followedBy.forEach(id => {
          let user = this.$store.state.allUsers.find(user => user._id == id)
          followedByArray.push(user)
        })
        return followedByArray
      },
      followedBy() {
        let user = this.$store.state.user
        let followingArray = []
        let following = user.following.forEach(id => {
          let user = this.$store.state.allUsers.find(user => user._id == id)
          followingArray.push(user)
        })
        return followingArray
      }
    },
    methods: {
      addPost() {
        this.$store.dispatch("addPost", this.newPost);
        event.target.reset();
      },
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      },
      chatroom(postId) {
        this.$router.push({
          path: "/posts/get/" + postId,
          name: "postDetails",
          params: {
            postId: postId
          }
        });
      },
      goProfile(user) {
        this.$router.push({
          path: '/posts/profile/' + user._id,
          name: 'friendProfile',
          params: {
            id: user._id
          }
        })
      },
      // unfollow(unfollow) {
      //   let payload = {
      //     name: unfollow,
      //     id: this.$store.state.user._id
      //   }
      //   this.$store.dispatch('unfollow', payload)
      // },
      allPosts() {
        this.$router.push({ path: "/" });
      },
      myProfile() {
        this.$router.push({ path: "/myProfile" });
      },
      goPosts() {
        this.$router.push({ path: '/posts/friendPosts/' })
      },
    },
    components: {
      Chatroom
    },
    filters: {
      formatTime(date) {
        return Moment(String(date))
          .startOf("hour")
          .fromNow();
      },
      formatTime2(date) {
        return Moment(String(date)).format("MMMM Do, YYYY");
      }
    }
  }
</script>

<style>
  #addMargin {
    margin-top: 60px;
  }
</style>

<style scoped>
  @media only screen and (min-width: 700px) {

    #bottom-nav {
      display: none
    }
  }

  #post {
    border: #3d6ea0 1px solid;
  }

  .username {
    color: #a0b5c5;
    font-family: "Amatic SC", cursive;
    margin-bottom: -0.2em;
    font-size: 24px;
  }

  .btn-my {
    background: #6496c7;
    color: white;
  }

  #btn-bar {
    background-color: #6496c7;
    color: black;
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

  #changeFont {
    color: #8396a4;
    font-family: "Amatic SC", cursive;
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

  .title {
    color: #3d6ea0;
    font-family: 'Patrick Hand SC', cursive;
    margin-bottom: -0.05em;
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