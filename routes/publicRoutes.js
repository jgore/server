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
    let promise1;
    
    if (!req.params.shortTitle || req.params.shortTitle.length == 0) {
      return res.status(404).send();
    }
    
    if (req.headers.token) {
      
      promise1 = new Promise((resolve, reject) => {
        getFromRedis(req.headers.token, (err, secret) => {
          
          if (err) {
            return reject();
          }
          if (secret === null) {
            return reject();
          }
          
          try {
            var decoded = getFromJWT(secret);
          } catch (err) {
            return err;
          }
          UserCollection.findOne({
            googleId: decoded.googleId
          })
            .then(user => {
              if (!user) {
                return res.status(401).send();
              }
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
        throw err;
      });

    if (promise1) {
      Promise.all([promise1, promise2])
        .then(results => {
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
          return document;
        })
        .then(document => {
          res.send(document);
        })
        .catch(errors => {
          if (errors.code === 404) {
            res.status(404).send();
          } else {
            res.status(409).send();
          }
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
