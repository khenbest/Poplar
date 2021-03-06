let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'

// let Lists = require('./list')


let schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  user: { type: String, ref: 'User', required: true },
  imgUrl1: { type: String, required: true },
  imgUrl2: { type: String },
  votes: { type: Object, default() { return {} } },
  tags: { type: String, enum: ["music", "sports", "fashion", "food", "movies", "meme-culture", "developer", "tv", "kimspiration", "question"] }
}, { timestamps: true })




module.exports = mongoose.model(schemaName, schema)