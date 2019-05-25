const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  subject: String,
  text: String,
  email: String,
  phone: String,
  city: String
})

module.exports = mongoose.model("messages", messageSchema);
