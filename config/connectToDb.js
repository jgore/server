const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const CourseCollection = require("../models/Course");
const VideoCollection = require("../models/Video");

module.exports = mongoURI => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, err => {
    if (err) {
      throw new Error(`Problem with connect to Mongo Database: ${mongoURI}`);
    }
    console.log(`Connected to Mongo Database: ${mongoURI}`);

    if (process.env.NODE_ENV != "production") {
      fs.readFile(path.join(__dirname, "../mockdata/db.json"), (err, data) => {
        if (err) {
          console.log(`Problem with load mock data from file`);
        }

        const parsed = JSON.parse(data);
        const { courses, videos } = parsed;

        courses.forEach(element => {
          element.reviews.forEach(element => {
            element.createdAt = new Date();
          });
        });

        CourseCollection.countDocuments({}, (err, count) => {
          if (count === 0) {
            CourseCollection.insertMany(courses);
          }
        });

        VideoCollection.countDocuments({}, (err, count) => {
          if (count === 0) {
            VideoCollection.insertMany(videos);
          }
        });
      });
    }
  });
};
