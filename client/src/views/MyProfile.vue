<template>
    <div class="posts container-fluid">
        <div class="row d-flex align-items-center h-100 bg-light text-center">
            <div class="col-12">
                <!-- FILTERS -->


                <!-- POST CARDS -->
                <div id="btn-bar" class="row d-flex justify-content-center ">
                    <div class="row d-flex justify-content-center">
                        <button class="btn btn-my" @click="showPosts = true">My Posts</button>
                        <button class="btn btn-my" @click="showPosts = false">My
                            Participated Posts</button>
                    </div>
                </div>
                <div class="row d-flex  justify-content-center">
                    <h1>{{this.$store.state.user.name}}'s Profile</h1>

                </div>
                <div class="row d-flex  justify-content-center">
                    <h3>Member Since: {{this.$store.state.user.createdAt | formatTime2}}</h3>
                </div>
                <span v-show="showPosts">
                    <div class="row ">
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
                                <button class="chatroom" @click="chatroom">Go to Chatroom!</button>
                            </div>
                            <button @click="deletePost(post._id)">Delete</button>
                        </div>
                    </div>
                </span>
                <span v-show="!showPosts">
                    <div class="row">
                        <div class="col-12">
                            <h3>Total Participated: {{this.$store.state.user.participated.length}}</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div id="post" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 m-2"
                            v-for="(participated, index) in participated" :key="index">
                            <div class="row">
                                <div class="col">
                                    <h4 class="username d-flex justify-content-center">
                                        {{participated.user || 'Unknown'}}</h4>
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
                                <button class="chatroom" @click="chatroom">Go to Chatroom!</button>
                            </div>
                            <button @click="deletePost(post._id)">Delete</button>
                        </div>
                    </div>
                </span>
                <!-- <router-link :to="{name: 'post', params: {postId: post._id}}">{{post.title}}</router-link> -->
            </div>
        </div>
        <div class="row pt-5">
            <div class="navbar fixed-bottom bg-white row justify-content-around">
                <a class="curs" :class="{active : activeClass == 2}" @click="activeClass = 2; allPosts();">
                    <i class=" fas fa-globe-americas filters fa-2x col=1"></i>
                </a>
                <i class="fas fa-users filters fa-2x col-1"></i>
                <a class="nav-item nav-link curs" :class="{active : activeClass == 3}"
                    @click="activeClass = 3; myProfile();"><i class="fas fa-user filters fa-2x col-1"></i></a>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>
<script>
    import Moment from 'moment';
    import Chatroom from "./Chatroom.vue"

    export default {
        name: "posts",
        created() {
            //blocks users not logged in
            if (!this.$store.state.user._id) {
                this.$router.push({ name: "login" });
            }
        },
        mounted() {
            this.$store.dispatch("getPosts", true); //without a second argument passed in this will get all the posts

        },
        data() {
            return {
                showPosts: true,
                newPost: {}
            };
        },
        computed: {
            posts() {
                return this.$store.state.posts;
            },
            participated() {
                return this.$store.state.user.participated
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
                allPosts() {
                    this.$router.push({ path: '/' });
                },
                myProfile() {
                    this.$router.push({ path: '/myProfile' })
                },

            },
            components: {
                Chatroom
            },
            filters: {
                formatTime(date) {
                    return Moment(String(date)).startOf('hour').fromNow();
                },
                formatTime2(date) {
                    return Moment(String(date)).format('MMMM Do, YYYY')
                }
            }
        };
</script>

<style scoped>
    #post {
        border: #3d6ea0 1px solid;

    }

    .username {
        color: #a0b5c5;
        font-family: 'Amatic SC', cursive;
        margin-bottom: -0.2em;
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