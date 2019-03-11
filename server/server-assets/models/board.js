let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Board'

let Lists = require('./list')


let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE

schema.pre('remove', function (next) {
  //lets find all the lists and remove them
  this._id //THIS IS THE BOARD
  Promise.all([
    //Tasks.deleteMany({ boardId: this._id }),
    Lists.deleteMany({ boardId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})




module.exports = mongoose.model(schemaName, schema)