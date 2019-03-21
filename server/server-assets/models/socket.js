class Socket {
  constructor(io) {
    let connectedUsers = {}
    let rooms = {}


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
          socket.join('POSTROOM')

          //adds user to connectedUsers
          connectedUsers[data.name] = data.name

          //notify connection of room connection
          socket.emit("joinedRoom", {
            roomName: "POSTROOM",
            connectedUsers: connectedUsers
          })

          //notify room of new connection
          io.to("POSTROOM").emit("newUser", { userName: data.name })
        }
      })

      //connection disconnectsd
      socket.on('disconnect', data => {
        if (socket.user) {
          //remove from connected room
          delete connectedUsers[socket.user]
          io.to('POSTROOM').emit('left', socket.user)
        }
      })

      socket.on('message', data => {
        if (data.message && data.user) {
          console.log('message received')
          io.to('POSTROOM').emit('newMessage', data)
        }
      })

      // Not sure what this does
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