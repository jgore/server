const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
  subject: String,
  text: String,
  email: String,
  phone: String
})

mongoose.model('messages', messageSchema)