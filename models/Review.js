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
  user: {
    type: Object
  },
  createdAt: {
    type: Date
  }
});

module.exports = review;
