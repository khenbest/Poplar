<template>
  <div class="Chatroom"
    :class="$mq | mq({xs: 'mb-5', sm: 'mb-5', md: 'border rounded mb-5', lg: 'border rounded mb-5'})">
    <div class="connected-users text-left">
      <h5 class="message text-center">Connected Users</h5>
      <ul>
        <li v-for="user in connectedUsers">
          {{user}}
        </li>
      </ul>
    </div>

    <div class="chat">
      <div class="row" v-for="item in messages">
        <div class="col-sm-2 text-left">
          <span class="name" style="font-weight: bold;">{{ item.user }} </span>
        </div>
        <div class="col-sm-7 text-left">
          <span class="message">{{ item.message }}</span>
        </div>
        <div class="col-sm-3 text-right">
          <span class="chat-date">{{item.createdAt | formatTime }}</span>
        </div>
      </div>
    </div>

    <br>
    <div class="text-center">
      <form @submit.prevent="send">
        <div class="form-group">
          <input type="text" class="form-control input-lg text-center chat-input" placeholder="Message"
            v-model="message">
        </div>
        <button class="btn send-btn mb-3" type="submit">Send</button>
      </form>
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
    color: #8396a4;
    font-family: "Amatic SC", cursive;
    font-size: 1.5em;
  }

  .name {
    font-size: 0.8em;
    color: #8396a4 !important;
  }

  .chat-date {
    font-size: 0.6em;
    color: #8396a4 !important;
  }

  .chat-input {
    font-size: 0.9em;
  }

  .send-btn {
    background-color: #6496c7;
    border: none;
    border-radius: 50px;
    color: #FFF;
    padding: 0.5vh 6vw;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 22px;
    transition: all 0.1s linear;
  }

  .send-btn:hover {
    background-color: #3979b9;
    transform: scale(1.03, 1);
    box-shadow: 2px 2px 2px grey;
    color: white;
  }

  .send-btn:active {
    background-color: #36608a;
  }

  .connected-users {
    border-bottom: #3c6ea0a1 solid 0.5px;
  }

  .message {
    color: #3d6ea0 !important;
    font-family: "Patrick Hand SC", cursive;
  }
</style>