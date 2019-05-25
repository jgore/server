const CourseCollection = require("../models/Course");
const UserCollection = require("../models/User");
const { privateRoute } = require("./middlewares/authMiddleware");

module.exports = app => {
  app.post("/api/reviews", privateRoute, (req, res) => {
    let { shortTitle, content, grade } = req.body.opinion,
      googleId = req.session.googleId;
    if (!shortTitle) {
      return res.status(400).send({});
    }
    CourseCollection.aggregate([
      {
        $unwind: "$reviews"
      },
      {
        $match: {
          "reviews.user.googleId": googleId,
          shortTitle
        }
      }
    ]).then(rows => {
      if (rows.length > 0) {
        return res.status(409).send({});
      }
      UserCollection.findOne({ googleId })
        .then(user => {
          if (!user) {
            return res.status(401).send({});
          }
          CourseCollection.updateOne(
            { shortTitle },
            {
              $push: {
                reviews: {
                  content,
                  grade,
                  user: user._doc,
                  createdAt: new Date()
                }
              }
            }
          ).then(doc => {
            CourseCollection.findOne({ shortTitle }).then(course => {
              if (!course) {
                return res.status(404).send({});
              }
              res.send({ course });
            });
          });
        })
        .catch(err => {
          res.status(400).send();
        });
    });
  });

  app.put("/api/courses/:shortTitle", privateRoute, (req, res) => {
    if (!req.params.shortTitle) {
      return res.status(400).send({});
    }
    CourseCollection.updateOne(
      {
        shortTitle: req.params.shortTitle,
        "reviews.user.googleId": req.session.googleId
      },
      {
        $set: {
          "reviews.$.content": req.body.opinion.content,
          "reviews.$.grade": req.body.opinion.grade
        }
      }
    )
      .then(stats => {
        CourseCollection.findOne({
          shortTitle: req.params.shortTitle
        }).then(doc => {
          res.status(200).send(doc);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({});
      });
  });
};
