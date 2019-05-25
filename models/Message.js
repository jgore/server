const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
  subject: String,
  text: String,
  email: String,
  phone: String,
  city: String
})

mongoose.model('messages', messageSchema)