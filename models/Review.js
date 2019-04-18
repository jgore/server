const mongoose = require("mongoose");
const { Schema } = mongoose;

const review = new Schema({
  content: {
    type: String,
    default: ""
  },
  grade: {
    type: Number
  },
  image: {
    type: String
  },
  username: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

module.exports = review;
