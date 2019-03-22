class Socket {
  constructor(io) {
    let connectedUsers = {}
    let rooms = {

      postId: []

      /**
       * postId: {
       *    roomName: 'kimJon' //post title,
       *    members: [{socket user}, ]
       * }
       * 
       * postId: [{socket user}, ]
       * 
       * to join a room you must send the post information needed above and any user information to make a socket user
       * 
       * 
       * 
       *  */
    }


    io.on("connection", socket => {
      console.log("User Connected")

      //notify user of successful connection
      socket.emit("CONNECTED", {
        socket: socket.id,
        message: "Successfully Connected",
        openRooms: Object.keys(rooms)
      })

      //join room
      socket.on("join", data => {
        //ensure connection passed name
        if (data.name) {
          //attaches name to socket
          socket.user = data.name

          //adds connection to room, will change this value
          socket.join(data.postId)

          //adds user to connectedUsers
          if (!connectedUsers[data.postId]) {
            connectedUsers[data.postId] = []
          }
          connectedUsers[data.postId].push(data.name)

          //notify connection of room connection
          socket.emit("joinedRoom", {
            roomName: data.postId,
            connectedUsers: connectedUsers[data.postId]
          })

          //notify room of new connection
          io.to(data.postId).emit("newUser", connectedUsers[data.postId])

        }
      })

      //connection disconnectsd
      socket.on('leave', data => {
        //make sure have postId
        if (socket.user) {
          //remove from connected room
          let users = connectedUsers[data.postId]
          users.forEach((user, index) => {
            if (user == data.name) {
              connectedUsers[data.postId].splice(index, 1)

            }
          })
          //remove the user with the name == data.user || data.name 
          io.to(data.postId).emit('left', connectedUsers[data.postId])
        }
      })

      socket.on('message', data => {
        //must know the postId here which is the roomname
        if (data.message && data.user) {
          io.to(data.postId).emit('newMessage', data)
        }
      })

      // This is way to utilize socket connections instead of typically utilizing http requests
      // socket.on('newBoard', data => {
      //   Boards.create(data)
      //     .then(res => {
      //       io.to('POSTROOM').emit('boardCreated', res)
      //     })
      // })

    });
  }
}

module.exports = Socket