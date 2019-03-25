<template>
  <div class="Chatroom">
    <div v-if="!joined" class="text-center">
      <!-- {{post.title}} -->
      <!-- <button class="btn btn-primary btn-lg" @click="join()">Join Chatroom</button> -->
    </div>
    <div v-else>
      <div class="connected-users text-left">
        <h5>Connected Users</h5>
        <ul>
          <li v-for="user in connectedUsers">
            {{user}}
          </li>
        </ul>
      </div>
      <div class="chat">
        <div class="row" v-for="item in messages">
          <div class="col-sm-2 text-left">
            <span class="name">{{ item.user }} </span>
          </div>
          <div class="col-sm-8">
            <span class="message">{{ item.message }}</span>
          </div>
          <div class="col-sm-2 text-right">
            <span class="name">{{item.createdAt | formatTime }}</span>
          </div>

        </div>
      </div>
      <div class="text-center">
        <form @submit.prevent="send">
          <div class="form-group">
            <input type="text" class="form-control input-lg text-center" placeholder="Message" v-model="message">
          </div>
          <button class="btn btn-primary btn-lg" type="submit">Send</button>
        </form>
      </div>
      <div class="text-center">
        <button class="btn btn-primary btn-lg" type="button" @click="$router.push({ name: 'posts' })">Leave
          Chat</button>
      </div>
    </div>
  </div>
</template>


<script>
  import router from "@/router.js"
  import Moment from 'moment'
  export default {
    name: 'Chatroom',
    props: ['post', 'participated'],
    data() {
      return {
        name: this.$store.state.user.name,
        message: ''
      }
    },
    mounted() {
      let payload = {
        name: this.name,
        postId: this.post ? this.post._id : this.participated._id
      }
      console.log(payload)
      this.$store.dispatch('join', payload)
    },
    computed: {
      joined() {
        return this.$store.state.joined
      },
      messages() {
        return this.$store.state.messages
      },
      connectedUsers() {
        return this.$store.state.roomData.connectedUsers
      }
    },
    methods: {
      send() {
        this.$store.dispatch('sendMessage', { user: this.name, message: this.message, postId: this.$route.params.postId })
        this.message = ''
      }
    },
    components: {},
    filters: {
      formatTime(date) {
        return Moment(date)
          .fromNow();
      }
    }
  }
</script>


<style scoped>

</style>