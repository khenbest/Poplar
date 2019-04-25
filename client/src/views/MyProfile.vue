<template>
  <div class="posts container-fluid"
    :class="$mq | mq({xs: 'margin-mobile', sm: 'margin-mobile', md: 'margin-comp', lg: 'margin-comp'})" v-if="user._id">
    <div class="row d-flex align-items-center bg-light text-center">
      <div class="col-12">



        <mq-layout mq="xs">
          <div class="row mt-1 profile-stats">
            <div class="col-5">
              <div class="row">
                <div class="col-12">
                  <p class="username-page-top" v-resize-text="{ratio:0.3}">
                    {{user.name}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="joined-page-top" v-resize-text="{ratio:0.8}">
                    Joined:
                    {{user.createdAt | formatTime2}}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row pt-3">
                <div class="col-4">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold">
                          {{posts.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 px-0">
                          posts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followersModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12  text-center justify-content-center font-weight-bold">
                          {{followedBy.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          followers </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followingModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold text-center justify-content-center">
                          {{following.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          following </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = true">My Posts</button>
                </div>
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = false">
                    Participated
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mq-layout>

        <mq-layout mq="sm">
          <div class="row mt-1 profile-stats">
            <div class="col-5">
              <div class="row">
                <div class="col-12">
                  <p class="username-page-top" v-resize-text="{ratio:0.3}">
                    {{user.name}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="joined-page-top" v-resize-text="{ratio:0.8}">
                    Joined:
                    {{user.createdAt | formatTime2}}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <div class="col-4">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold">
                          {{posts.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 px-0">
                          posts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followersModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12  text-center justify-content-center font-weight-bold">
                          {{followedBy.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          followers </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followingModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold text-center justify-content-center">
                          {{following.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          following </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = true">My Posts</button>
                </div>
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = false">
                    Participated
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mq-layout>

        <mq-layout mq="md">
          <div class="row mt-1 profile-stats">
            <div class="col-5">
              <div class="row">
                <div class="col-12">
                  <p class="username-page-top" v-resize-text="{ratio:0.6}">
                    {{user.name}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="joined-page-top" v-resize-text="{ratio:2}">
                    Joined:
                    {{user.createdAt | formatTime2}}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <div class="col-4">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold">
                          {{posts.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 px-0">
                          posts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followersModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12  text-center justify-content-center font-weight-bold">
                          {{followedBy.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          followers </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followingModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold text-center justify-content-center">
                          {{following.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          following </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = true">My Posts</button>
                </div>
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = false">
                    Participated
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mq-layout>
        <mq-layout mq="lg">
          <div class="row mt-1 profile-stats">
            <div class="col-5">
              <div class="row">
                <div class="col-12">
                  <p class="username-page-top" v-resize-text="{ratio:0.6}">
                    {{user.name}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="joined-page-top" v-resize-text="{ratio:2}">
                    Joined:
                    {{user.createdAt | formatTime2}}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="row">
                <div class="col-4">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold">
                          {{posts.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 px-0">
                          posts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followersModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12  text-center justify-content-center font-weight-bold">
                          {{followedBy.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          followers </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clickable col-4" data-toggle="modal" data-target="#followingModal">
                  <div class="row">
                    <div class="col-12 text-center stat-boxes">
                      <div class="row">
                        <div class="col-12 font-weight-bold text-center justify-content-center">
                          {{following.length}}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 text-center justify-content-center px-0">
                          following </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = true">My Posts</button>
                </div>
                <div class="col-6 d-flex justify-content-center mt-2">
                  <button class="btn profile-sort-btn" @click="showPosts = false">
                    Participated
                  </button>
                </div>
              </div>
            </div>
          </div>
        </mq-layout>




        <!-- PROFILE NAME AND JOIN DATE -->
        <!-- <div class="row d-flex justify-content-center mt-2">
          <h1 id="changeFont">{{user.name}}'s Profile</h1>
        </div> -->
        <!-- <div class="row d-flex justify-content-center" id="changeFont">
          <h3>Member Since: {{user.createdAt | formatTime2}}</h3>
        </div> -->

        <!-- MY POSTS AND PARTICIPATED BUTTONS -->
        <!-- <div class="row d-flex justify-content-center">
          <button class="btn btn-outline-primary m-2" @click="showPosts = true">My Posts</button>
          <button class="btn btn-outline-primary m-2" @click="showPosts = false">
            My
            Participated Posts
          </button>
        </div> -->

        <!-- TOTAL POSTS -->
        <!-- <div class="col-2 mt-3">
          <h6>Total Posts: {{posts.length}}</h6>
        </div> -->

        <!-- FOLLOWERS/FOLLOWING MODAL BUTTONS -->
        <!-- <div class="col-2 mt-3">
          <h6 class="clickable" data-toggle="modal" data-target="#followersModal">Followers: {{following.length}}</h6>
        </div>
        <div class="col-2">
          <h6 class="clickable" data-toggle="modal" data-target="#followingModal">Following: {{followedBy.length}}</h6>
        </div> -->


        <!-- Followers Modal -->
        <div class="modal fade" id="followersModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModal3Label">Followers</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div v-for="follows in followedBy">
                  <li class="clickable username text-dark text-left p-2" data-dismiss="modal"
                    @click="goProfile(follows)">{{follows.name}}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Following Modal -->
        <div class="modal fade" id="followingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModal3Label">Following</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div v-for="follows in following">
                  <li class="clickable username text-dark text-left p-2" data-dismiss="modal"
                    @click="goProfile(follows)">{{follows.name}}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MY POSTS -->
        <span v-show="showPosts">
          <div class="row">
            <div :class="$mq | mq({xs: 'col-12', sm: 'col-12', md: 'col-3', lg: 'col-4'})" v-for="post in posts"
              :key="post._id">
              <div
                :class="$mq | mq({xs: 'col-12 px-0 mx-0', sm: 'col-12 px-0 mx-0', md: 'col-4 mt-3 border', lg: 'col-12 mt-2 border px-0 mx-0 shadow-sm rounded'})">
                <div class="row d-flex justify-content-center">
                  <div class="col d-flex justify-content-center">
                    <h4
                      :class="$mq | mq({xs: 'username mx-2', sm: 'username mx-2', md: 'username mx-2', lg: 'username mx-2'})"
                      @click="
          goProfile(post.authorId)">{{post.user || 'Unknown'}}</h4>
                    <!-- <button class="mx-2 btn btn" @click="addFollow(post.authorId)"><i class="fas fa-user-plus"></i> follow</button> -->
                  </div>
                </div>
                <div class="row">
                  <div v-if="post.title.length < 28" class="col d-flex justify-content-center">
                    <h4 class="title">{{post.title}}</h4>
                  </div>
                  <div v-else class="col d-flex justify-content-center">
                    <h4 type="text" class="title" data-toggle="tooltip" data-placement="top" :title="post.title">
                      {{post.title.substring(0,28)}}...
                    </h4>
                    <div class="text-center my-3">
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div v-if="!post.imgUrl2" :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})">
                    <img :src="post.imgUrl1" :class="$mq | mq({xs: 'photo', sm: 'photo', md: 'photo', lg: 'photo'})">
                  </div>
                  <div v-else :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})"
                    :style="$mq | mq({xs: 'max-width: 481px', sm: 'max-width: 481px', md: '', lg: ''})">
                    <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})"
                      :src="post.imgUrl1">
                    <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})"
                      :src="post.imgUrl2">
                  </div>
                </div>
                <!-- GO TO CHAT -->
                <div v-if="participated">
                  <div
                    :class="$mq | mq({xs: 'col-12 mt-2', sm: 'col-12 mt-2', md: 'col-12 mt-2 border-left border-right border-bottom', lg: 'col-12 border-left border-right border-bottom'})">
                    <button
                      :class="$mq | mq({xs: 'chat-button', sm: 'chat-button', md: 'chat-button my-4', lg: 'chat-button my-2'})"
                      @click="chatroom(post._id)">What Are People Saying?</button>
                    <button class="btn delete-btn mb-2" @click="deletePost(post._id)">Delete Post</button>
                  </div>
                </div>
                <div
                  :class="$mq | mq({xs: 'row py-1 mb-3 bottom-line', sm: 'row pb-1 mb-3 bottom-line', md: 'row mb-2', lg: 'row mb-2'})">
                  <div
                    :class="$mq | mq({xs: 'col d-flex justify-content-center', sm: 'col d-flex justify-content-center', md: 'col d-flex justify-content-center', lg: 'col d-flex justify-content-center'})">
                    <h4 class="timestamp">{{post.createdAt| formatTime}}</h4>
                  </div>
                </div>
                <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
              </div>
            </div>
          </div>
        </span>

        <!-- MY PARTICIPATED -->
        <span v-show="!showPosts">
          <div class="row">
            <div :class="$mq | mq({xs: 'col-12', sm: 'col-12', md: 'col-3', lg: 'col-4'})"
              v-for="(participated, index) in participated" :key="index">
              <div
                :class="$mq | mq({xs: 'col-12 px-0 mx-0', sm: 'col-12 px-0 mx-0', md: 'col-4 mt-3 border', lg: 'col-12 mt-2 border px-0 mx-0 shadow-sm rounded'})">
                <div class="row d-flex justify-content-center">
                  <div class="col d-flex justify-content-center">
                    <h4
                      :class="$mq | mq({xs: 'username mx-2', sm: 'username mx-2', md: 'username mx-2', lg: 'username mx-2'})"
                      @click="
          goProfile(participated.authorId)">{{participated.user || 'Unknown'}}</h4>
                    <!-- <button class="mx-2 btn btn" @click="addFollow(participated.authorId)"><i class="fas fa-user-plus"></i> follow</button> -->
                  </div>
                </div>
                <div class="row">
                  <div v-if="participated.title.length < 28" class="col d-flex justify-content-center">
                    <h4 class="title">{{participated.title}}</h4>
                  </div>
                  <div v-else class="col d-flex justify-content-center">
                    <h4 type="text" class="title" data-toggle="tooltip" data-placement="top"
                      :title="participated.title">
                      {{participated.title.substring(0,28)}}...
                    </h4>
                    <div class="text-center my-3">
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div v-if="!participated.imgUrl2"
                    :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})">
                    <img :src="participated.imgUrl1"
                      :class="$mq | mq({xs: 'photo', sm: 'photo', md: 'photo', lg: 'photo'})">
                  </div>
                  <div v-else :class="$mq | mq({xs: 'col px-0', sm: 'col px-0', md: 'col', lg: 'col'})"
                    :style="$mq | mq({xs: 'max-width: 481px', sm: 'max-width: 481px', md: '', lg: ''})">
                    <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})"
                      :src="participated.imgUrl1">
                    <img :class="$mq | mq({xs: 'photos', sm: 'photos', md: 'photos2', lg: 'photos2'})"
                      :src="participated.imgUrl2">
                  </div>
                </div>
                <!-- GO TO CHAT -->
                <div v-if="participated">
                  <div
                    :class="$mq | mq({xs: 'col-12 mt-2', sm: 'col-12 mt-2', md: 'col-12 mt-2 border-left border-right border-bottom', lg: 'col-12 border-left border-right border-bottom'})">
                    <button
                      :class="$mq | mq({xs: 'chat-button', sm: 'chat-button', md: 'chat-button my-4', lg: 'chat-button my-2'})"
                      @click="chatroom(participated._id)">What Are People Saying?</button>
                  </div>
                </div>
                <div
                  :class="$mq | mq({xs: 'row py-1 mb-3 bottom-line', sm: 'row pb-1 mb-3 bottom-line', md: 'row mb-2', lg: 'row mb-2'})">
                  <div
                    :class="$mq | mq({xs: 'col d-flex justify-content-center', sm: 'col d-flex justify-content-center', md: 'col d-flex justify-content-center', lg: 'col d-flex justify-content-center'})">
                    <h4 class="timestamp">{{participated.createdAt| formatTime}}</h4>
                  </div>
                </div>
                <!-- <router-link :to="{name: 'participated', params: {participatedId: participated._id}}">{{participated.title}}</router-link> -->
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>

  <!-- :class="$mq | mq({xs: '', sm: '', md: '', lg: ''})" -->

</template>

<script>
  import Moment from "moment";
  import Chatroom from "@/components/Chatroom.vue";

  export default {
    name: "posts",
    props: ["post"],
    created() {
      //blocks users not logged in
      if (!this.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getMyPosts", true)
      this.$store.dispatch("getUsers")
      if (!this.$store.state.posts.length) {
        this.$store.dispatch("getPosts")
      }
    },
    data() {
      return {
        showPosts: true,
        newPost: {},
        activeClass: null
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      posts() {
        return this.$store.state.myPosts;
      },
      participated() {
        return this.$store.getters.participated;
      },
      following() {
        let followedByArray = []
        let followedBy = this.user.followedBy.forEach(id => {
          let user = this.$store.state.allUsers.find(user => user._id == id)
          followedByArray.push(user || {})
        })
        return followedByArray
      },
      followedBy() {
        let followingArray = []
        let following = this.user.following.forEach(id => {
          let user = this.$store.state.allUsers.find(user => user._id == id)
          followingArray.push(user || {})
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
      //     id: user._id
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

<style scoped>
  .profile-stats {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.479);
    background-color: rgb(252, 251, 255);
  }

  .stat-boxes {
    color: #3d6ea0;
  }

  .margin-mobile {
    margin-top: 50px;
  }

  .delete-btn {
    background-color: #e05757;
  }

  .delete-btn:hover {
    background-color: #e64646;
  }

  .delete-btn:active {
    background-color: #ce4e4e;
  }

  .btn {
    border: none;
    border-radius: 50px;
    color: #FFF;
    padding: 0.5vh 4vw;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    transition: all 0.1s linear;
  }

  .btn:hover {
    transform: scale(1.03, 1);
    box-shadow: 2px 2px 2px grey;
    color: white;
  }

  .btn:active {
    background-color: #36608a;
  }


  .margin-comp {
    margin-top: 66px;
  }

  .clickable:hover {
    cursor: pointer;
  }

  .sample {
    color: black !important;
  }

  .username {
    color: #8396a4;
    font-family: "Amatic SC", cursive;
    margin-bottom: -0.2em;
    font-size: 24px;
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

  .profile-sort-btn {
    background-color: #6496c7;
    border: none;
    border-radius: 50px;
    color: #FFF;
    padding: 0.5vh 3.8vw;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    transition: all 0.1s linear;
  }

  .profile-sort-btn:hover {
    background-color: #3979b9;
    transform: scale(1.03, 1);
    box-shadow: 2px 2px 2px grey;
    color: white;
  }

  .profile-sort-btn:active {
    background-color: #36608a;
  }

  .username-page-top {
    color: #8396a4;
    font-family: "Amatic SC", cursive;
    width: 100%;
    padding-top: 0px;
    margin-bottom: 0px;
  }

  .joined-page-top {
    color: #8396a4;
    font-family: "Amatic SC", cursive;
    font-size: 1em;
    font-weight: 400;
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

  /* font-family: 'Amatic SC', cursive;
font-family: 'Patrick Hand SC', cursive;
font-family: 'Dekko', cursive;
font-family: 'Itim', cursive;
font-family: 'Kalam', cursive;
font-family: 'Just Me Again Down Here', cursive; */

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
    transition: all 0.2s linear;
  }

  .title:hover {
    cursor: default;
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

  .mobile {
    font-size: 5px;
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
    border-radius: 0 !important;
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

  .chat-button {
    background-color: #6496c7;
    border: none;
    border-radius: 50px;
    color: #FFF;
    padding: 10px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    transition: all 0.1s linear;
  }

  .chat-button:hover {
    background-color: #3979b9;
    transform: scale(1.03, 1);
    box-shadow: 2px 2px 2px grey;
  }

  .chat-button:active {
    background-color: #36608a;
  }
</style>