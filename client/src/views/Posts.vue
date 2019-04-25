<template>
  <div class="posts container-fluid"
    :class="$mq | mq({xs: 'margin-mobile', sm: 'margin-mobile', md: 'margin-comp', lg: 'margin-comp'})">
    <div class="row bg-light justify-content-center text-center"
      :class="$mq | mq({xs: 'py-1 fixed-top mt-5 mobile-filter-bg', sm: 'py-1 fixed-top mt-5 mobile-filter-bg', md: 'py-1', lg: 'py-1'})">
      <div class="dropdown m-2" :class="$mq | mq({xs: '', sm: '', md: '', lg: ''})">
        <button
          :class="$mq | mq({xs: 'btn btn-outline-primary mx-2', sm: 'btn btn-outline-primary mx-2', md: 'btn btn-outline-primary mx-2', lg: 'btn btn-outline-primary mx-2'})"
          @click="filterbyTag()">Reset</button>
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="activity()">Most Activity</a>
          <a class="dropdown-item text-dark" @click="oldest()">Oldest</a>
        </div>
      </div>
      <div :class="$mq | mq({xs: 'dropdown m-2', sm: 'dropdown m-2', md: 'dropdown m-2', lg: 'dropdown m-2'})">
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
      <div :class="$mq | mq({xs: 'dropdown m-2', sm: 'dropdown m-2', md: 'dropdown m-2', lg: 'dropdown m-2'})">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Tags
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="filterbyTag('music')">Music</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('sports')">Sports</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('movies')">Movies</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('fashion')">Fashion</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('food')">Food</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('tv')">TV</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('kimspiration')">Kimspiration</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('developer')">Developer Meme's</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('question')">Questions</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag('meme-culture')">Meme-Culture</a>
        </div>
      </div>

      <form v-if="showForm" @submit.prevent="filterbyUser">
        <input type="text" v-model="username" placeholder="type username here" />
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>

    <!-- POST CARDS -->
    <div v-if="filtered == ''" class="row bar justify-content-center mx-0">
      <post v-for="post in posts" :post="post"></post>
    </div>
    <div v-else class="row bar">
      <post v-for="filter in filtered" :post="filter"></post>
    </div>
    <!-- <button @click="pageUp()" class="btn btn-outline-primary">Next</button>
    <button @click="pageDown()" class="btn btn-outline-primary">Previous</button> -->
  </div>
</template>

<script>
  import Moment from 'moment';
  import Chatroom from "@/components/Chatroom.vue"
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
      this.$store.dispatch("getPosts")
    }, //without a second argument passed in this will get all the posts
    data() {
      return {
        newPost: {},
        activeClass: null,
        showForm: false,
        username: '',
        filter: '',
        visiblePosts: [],
        lessThan: 8,
        greaterThan: -1,
      }
    },
    computed: {
      posts() {
        return this.$store.state.posts
      },
      filtered() {
        return this.$store.state.filteredPosts
      },
    },
    methods: {
      // pageUp() {
      //   this.lessThan += 8
      //   this.greaterThan += 8
      // },
      // pageDown() {
      //   this.lessThan -= 8
      //   this.greaterThan -= 8
      // },
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
      goPosts() {
        this.$router.push({ path: '/posts/friendPosts/' })
      },
    },
    components: {
      Chatroom,
      Post
    },
    filters: {
      formatTime(date) {
        return Moment(String(date)).fromNow();
      }
    }
  }
</script>

<style scoped>
  /* @media only screen and (min-width: 700px) {

    #bottom-nav {
      display: none
    }
  } */

  .margin-mobile {
    margin-top: 160px;
  }

  .margin-comp {
    margin-top: 66px;
  }

  .username {
    color: #a0b5c5;
    font-family: 'Amatic SC', cursive;
    margin-bottom: -0.2em;
  }

  .mobile-filter-bg {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.479);
    background-color: rgb(252, 251, 255);
  }

  .btn-outline-primary {
    border-color: #6496c7
  }

  .btn-outline-primary:hover {
    background-color: #6496c7
  }

  .btn-outline-primary:active {
    background-color: #3d6ea0
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

  .fas:hover {
    cursor: pointer;
  }

  .sortButtons {
    margin-right: 0;
    margin-left: 0;
    width: 50%;
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