const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  phone: String,
  image: {
    type: String,
    default: "guest.png"
  }
});

mongoose.model("users", userSchema);

module.exports = mongoose.model("users", userSchema);
