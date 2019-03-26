<template>
  <div class="posts container-fluid">
    <div class="row align-items-center justify-content-center no-wrap py-1 bg-light">
      <div class="dropdown mr-2">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="activity()">Most Activity</a>
          <a class="dropdown-item text-dark" @click="oldest()">Oldest</a>
          <a class="dropdown-item text-dark" @click="reset()">Reset</a>

        </div>
      </div>
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="yesNo(); showForm = false">Yes or no</a>
          <a class="dropdown-item text-dark" @click="thisThat();showForm = false">This or that</a>
          <a class="dropdown-item text-dark" @click="showForm = true">Filter by Username</a>
        </div>
      </div>
      <div class="dropdown m-2">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="filterbyTag('music')">Music</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('sports')">Sports</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('movies')">Movies</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('fashion')">Fashion</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('food')">Food</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('meme-culture')">Meme-Culture</a>

        </div>
      </div>
      <form v-if="showForm" @submit.prevent="filterbyUser">
        <input type="text" v-model="username" placeholder="type username here" />
        <button class="btn btn-secondary" type="submit">Search</button>
      </form>
    </div>

    <!-- POST CARDS -->
    <div v-if="filtered == ''" class="row bar">
      <post v-for="post in posts" :post="post"></post>
    </div>
    <div v-else class="row bar">
      <post v-for="filter in filtered" :post="filter"></post>
    </div>
    <div id='bottom-nav' class="row mt-4 pt-5">
      <div class="navbar fixed-bottom bg-white row justify-content-around">
        <i class=" fas fa-globe-americas filters fa-2x col=1"></i>
        <i class="fas fa-users filters fa-2x col-1"></i>
        <a class="nav-item nav-link curs" :class="{active : activeClass == 3}" @click="activeClass = 3; myProfile();"><i
            class="fas fa-user filters fa-2x col-1"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import Moment from 'moment';
  import Chatroom from "./Chatroom.vue"
  import Post from "@/components/Post.vue"

  export default {
    name: "posts",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getPosts");
    }, //without a second argument passed in this will get all the posts
    data() {
      return {
        newPost: {},
        activeClass: null,
        showForm: false,
        username: '',
      }
    },
    computed: {
      posts() {
        return this.$store.state.posts
      },
      filtered() {
        return this.$store.state.filteredPosts
      }
    },
    methods: {
      yesNo() {
        this.$store.dispatch('yesNo')
      },
      thisThat() {
        this.$store.dispatch('thisThat')
      },
      filterbyUser() {
        this.$store.dispatch('filterUser', this.username)
      },
      filterbyTag(tag) {
        this.$store.dispatch('filterTags', tag)
      },
      activity() {
        this.$store.dispatch('activity')
      },
      oldest() {
        this.$store.dispatch('oldest')
      },
      reset() {
        this.$store.dispatch('reset')
      },
      addPost() {
        this.$store.dispatch("addPost", this.newPost);
        event.target.reset()
      },
      deletePost(postId) {
        this.$store.dispatch("deletePost", postId);
      },
      chatroom() {
        this.$router.push({ name: 'postDetails' })
      },
      allPosts() {
        this.$router.push({ path: '/' });
      },
      myProfile() {
        this.$router.push({ path: '/posts/myProfile' })
      },
    },
    components: {
      Chatroom,
      Post
    },
    filters: {
      formatTime(date) {
        return Moment(String(date)).startOf('hour').fromNow();
      }
    }
  }
</script>

<style scoped>
  @media only screen and (min-width: 700px) {

    #bottom-nav {
      display: none
    }
  }

  .username {
    color: #a0b5c5;
    font-family: 'Amatic SC', cursive;
    margin-bottom: -0.2em;
  }

  .title {
    color: #3d6ea0;
    font-family: 'Patrick Hand SC', cursive;
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
    font-family: 'Kalam', cursive;
  }

  .timestamp {
    color: #3d6ea0;
    font-size: 1em;
  }

  .filters {
    color: #c2c2c3;
  }

  .filters:active {
    color: #3d6ea0
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
    font-family: 'Kalam', cursive;
  }

  /* font-family: 'Amatic SC', cursive;
font-family: 'Patrick Hand SC', cursive;
font-family: 'Dekko', cursive;
font-family: 'Itim', cursive;
font-family: 'Kalam', cursive;
font-family: 'Just Me Again Down Here', cursive; */
</style>