<template>
  <div class="Chatroom p-5 mt-0 py-5 border rounded bg-white" id="addMargin">
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
      <hr>
      <div class="chat">
        <div class="row" v-for="item in messages">
          <div class="col-sm-2 my-2 text-left">
            <span class="name" style="font-weight: bold;">{{ item.user }} </span>
          </div>
          <div class="col-sm-7 my-2 text-left">
            <span class="message">{{ item.message }}</span>
          </div>
          <div class="col-sm-3 my-2 text-right">
            <span class="name">{{item.createdAt | formatTime }}</span>
          </div>
        </div>
      </div>
      <br>
      <div class="text-center">
        <form @submit.prevent="send">
          <div class="form-group">
            <input type="text" class="form-control input-lg text-center" placeholder="Message" v-model="message">
          </div>
          <button class="btn btn-outline-primary btn-lg" type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
  import Moment from 'moment'
  export default {
    name: 'Chatroom',
    data() {
      return {
        name: this.$store.state.user.name,
        message: ''
      }
    },
    mounted() {
      let payload = {
        name: this.$store.state.user.name,
        postId: this.$route.params.postId
      }
      this.$store.dispatch('join', payload)
      console.log(payload)
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
      },
      // votedColor: function () {

      //   return {
      //     voteNo: this.$store.state.activePost.votes.find(userId => {
      //       return userId == this.$store.state.user._id
      //     })
      //   }
      // }



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
  .voteNo {
    color: red !important;
  }

  .voteYes {
    color: green !important;
  }

  .Chatroom {
    font-family: default;
  }
</style>