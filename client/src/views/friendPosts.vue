<template>
  <div class="posts container-fluid">
    <div class="row py-1 bg-light justify-content-center text-center">
      <!-- <div class=" dropdown m-2">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="activity()">Most Activity</a>
          <a class="dropdown-item text-dark" @click="oldest()">Oldest</a>
          <a class="dropdown-item text-dark" @click="reset()">Reset</a>

        </div>
    </div> -->
      <!-- <div class="dropdown m-2">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-dark" @click="yesNo(); showForm = false">Yes or no</a>
          <a class="dropdown-item text-dark" @click="thisThat();showForm = false">This or that</a>
        </div>
      </div> -->
      <!-- <div class="dropdown m-2">
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
          <a class="dropdown-item text-dark" @click=" filterbyTag('meme-culture')">Meme-Culture</a>
          <a class="dropdown-item text-dark" @click=" filterbyTag()">Reset</a>
        </div>
      </div> -->
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
        <a class="nav-item nav-link curs" :class="{active : activeClass == 2}" @click="activeClass = 2; allPosts();"><i
            class=" fas fa-globe-americas filters fa-2x col=1"></i></a>
        <i class="fas fa-users filters fa-2x col-1"></i>
        <a class="nav-item nav-link curs" :class="{active : activeClass == 3}" @click="activeClass = 3; myProfile();"><i
            class="fas fa-user filters fa-2x col-1"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import Moment from 'moment';
  import Chatroom from "@/components/Chatroom.vue"
  import Post from "@/components/Post.vue"

  export default {
    name: "posts",
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getPosts");
    },
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
        let friends = []
        this.$store.state.user.following.forEach(id => {
          let friend = this.$store.state.allUsers.find(person => person._id == id)
          friends.push(friend)
        })
        let friendPosts = []
        friends.forEach(friend => {
          this.$store.state.posts.forEach(post => {
            if (post.authorId == friend._id) {
              friendPosts.push(post)
            }
          })
        })
        console.log(friendPosts)
        return friendPosts
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
        return Moment(String(date)).fromNow();
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

  .filters {
    color: #c2c2c3;
  }

  .filters:active {
    color: #3d6ea0
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