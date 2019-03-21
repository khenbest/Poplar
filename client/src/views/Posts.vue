<template>
  <div class="posts container-fluid">
    <div class="row">
      <div class="col-12">

        <!-- FILTERS -->
        <div class="navbar fixed-bottom bg-white row justify-content-around">
          <i class="fas fa-globe-americas filters fa-2x col=1"></i>
          <i class="fas fa-users filters fa-2x col-1"></i>
          <i class="fas fa-user filters fa-2x col-1"></i>
        </div>

        <!-- CREATE POST FORM -->
        <div class="row">
          <div class="col">
            <form @submit.prevent="addPost">
              <input type="text" placeholder="title" v-model="newPost.title" required>
              <input type="text" placeholder="Image URL" v-model="newPost.imgUrl1" required>
              <button type="submit">Create Post</button>
            </form>
          </div>
        </div>

        <!-- POST CARDS -->
        <div class="row">
          <post v-for="post in posts" :post="post"></post>
        </div>
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
      this.$store.dispatch("getPosts"); //without a second argument passed in this will get all the posts
    },

    data() {
      return {
        newPost: {}
      };
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      }
    },
    methods: {
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
      castVote(vote) {
        debugger
        let postId = this.post.id

        console.log(postId)
        this.$store.dispatch('castVote', {
          endpoint: 'posts/${postId}'
        })
      }
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
  };
</script>

<style scoped>
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