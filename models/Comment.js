const mongoose = require("mongoose");
const Reviews = require("./Review");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Object,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

module.exports = commentSchema;
