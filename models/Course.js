const mongoose = require("mongoose");
const Reviews = require("./Review");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  video: {
    link: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    shortDescription: {
      type: String,
      default: ""
    }
  },
  content: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  technologies: {
    type: Array
  },
  reviews: [Reviews]
});

const CoursesCollection = mongoose.model("courses", courseSchema);
module.exports = CoursesCollection;
