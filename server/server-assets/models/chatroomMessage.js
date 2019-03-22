let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Message'


let schema = new Schema({
    message: { type: String, required: true },
    user: { type: String, required: true },
    postId: { type: ObjectId, ref: 'Post', required: true }
}, { timestamps: true })




module.exports = mongoose.model(schemaName, schema)