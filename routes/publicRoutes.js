const CourseCollection = require("../models/Course");
const VideoCollection = require("../models/Video");
const UserCollection = require("../models/User");
const { getFromRedis } = require("../config/connectToCache");
const { getFromJWT } = require("../services/jwt");

module.exports = app => {
  app.get("/api/courses", (req, res) => {
    CourseCollection.find({}, (err, docs) => {
      res.send(docs);
    });
  });
  app.get("/api/courses/:shortTitle", (req, res) => {
    console.log("Asd")
    let promise1;
    if (req.headers.token) {
      promise1 = new Promise((resolve, reject) => {
        getFromRedis(req.headers.token, (err, secret) => {
          if (err) {
            reject();
          }
          if (!secret) {
            reject();
          }
          console.log(secret)
          try {
            var decoded = getFromJWT(secret);
          } catch (err) {
            throw err;
          }
          console.log(decoded)
          UserCollection.findOne({
            googleId: decoded.googleId
          })
            .then(user => {
              console.log(user)
              CourseCollection.aggregate([
                {
                  $unwind: "$reviews"
                },
                {
                  $match: {
                    "reviews.user.googleId": user.googleId,
                    shortTitle: req.params.shortTitle
                  }
                },
                {
                  $project: {
                    "reviews.grade": 1,
                    "reviews.content": 1
                  }
                }
              ]).then(docs => {
                if (docs.length > 0) {
                  resolve(docs[0]);
                }
                resolve(false);
              });
            })
            .catch(err => {
              return err;
            });
        });
      }).catch(err => {
        console.log(err)
        return err;
      });
    }
    let promise2 = CourseCollection.findOne({
      shortTitle: req.params.shortTitle
    })
      .then(doc => {
        if (!doc) {
          throw { code: 404 };
        }
        return doc;
      })
      .catch(err => {
        console.log(err)
        throw err;
      });

    if (promise1) {
      Promise.all([promise1, promise2])
        .then(results => {
          console.log(results);
          let document;
          if (results[0] != undefined && results[0]) {
            document = {
              isReviewed: true,
              opinion: results[0],
              course: results[1]
            };
          } else if (results[0] != undefined && !results[0]) {
            document = {
              isReviewed: false,
              course: results[1]
            };
          } else {
            document = {
              course: results[1]
            };
          }
          console.log(JSON.stringify({}, undefined, 5));
          return document;
        })
        .then(document => {
          res.send(document);
        })
        .catch(errors => {
          console.log(errors);
          res.status(409).send();
        });
    } else {
      promise2
        .then(document => {
          res.send({
            course: document
          });
        })
        .catch(err => {
          res.status(404).send();
        });
    }
  });

  app.get("/api/videos", (req, res) => {
    VideoCollection.find({}, (err, docs) => {
      res.send(docs);
    });
  });
};
