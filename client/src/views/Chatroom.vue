<template>
  <div class="Chatroom">
    <div v-if="!joined" class="text-center">
      {{post.title}}
      <button class="btn btn-primary btn-lg" @click="join()">Join Chatroom</button>
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
          <div class="col-sm-2 text-right">
            <span class="name">{{ item.user }}</span>
          </div>
          <div class="col-sm-10">
            <span class="message">{{ item.message }}</span>
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
        <button class="btn btn-primary btn-lg" type="button" @click="leave">Leave Chat</button>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Chatroom',
    props: ['post'],
    data() {
      return {
        name: this.$store.state.user.name,
        message: ''
      }
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
      join() {
        let payload = {
          name: this.name,
          postId: this.post._id
        }
        console.log(payload)
        this.$store.dispatch('join', payload)
      },
      leave() {
        let payload = {
          name: this.name,
          postId: this.post._id
        }
        this.$store.dispatch('leaveRoom', payload)
      },
      send() {
        this.$store.dispatch('sendMessage', { user: this.name, message: this.message, postId: this.$route.params.postId })
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>