let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Post'

// let Lists = require('./list')


let schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  user: { type: String, ref: 'User' },
  imgUrl1: { type: String, required: true },
  imgUrl2: { type: String },
  votes: {},
  tags: { type: String, enum: ["music", "sports", "fashion", "food", "movies"] }
}, { timestamps: true })

//CASCADE ON DELETE

// schema.pre('remove', function (next) {
//   //lets find all the lists and remove them
//   this._id //THIS IS THE POST
//   Promise.all([
//     //Tasks.deleteMany({ postId: this._id }),
//     Lists.deleteMany({ postId: this._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })




module.exports = mongoose.model(schemaName, schema)