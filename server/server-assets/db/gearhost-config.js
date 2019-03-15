var mongoose = require('mongoose')
var connectionString = "mongodb://markkanban:CodeStudent!@den1.mongo1.gear.host:27001/markkanban" //CHANGE ME!!!!!
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})