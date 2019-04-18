const CourseCollection = require("../models/Course");
const VideoCollection = require("../models/Video");

module.exports = app => {
  app.get("/api/courses", (req, res) => {
    CourseCollection.find({}, (err, docs) => {
      res.send(docs);
    });
  });
  app.get("/api/courses/:shortTitle", (req, res) => {
    CourseCollection.findOne({
      shortTitle: req.params.shortTitle
    })
      .then(doc => {
        if (!doc) {
          return res.status(404).send();
        }
        res.send(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });
  });
  app.get("/api/videos", (req, res) => {
    VideoCollection.find({}, (err, docs) => {
      res.send(docs);
    });
  });
};
