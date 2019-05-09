const { createToken, removeToken } = require("../services/token");
const { privateRoute } = require("./middlewares/authMiddleware");
const CourseCollection = require("../models/Course");
const UserCollection = require("../models/User");

module.exports = app => {
  app.post("/api/comments", privateRoute, (req, res) => {
    let { shortTitle, content } = req.body.opinion,
      googleId = req.session.googleId;
    console.log(req.body);
    if (!shortTitle || !content) {
      return res.status(400).send();
    }
    UserCollection.findOne({ googleId })
      .then(user => {
        if (!user) {
          return res.status(401).send();
        }
        CourseCollection.updateOne(
          { shortTitle },
          {
            $push: {
              comments: {
                content,
                user: user._doc,
                createdAt: new Date()
              }
            }
          }
        )
          .then(doc => {
            CourseCollection.findOne({ shortTitle }).then(course => {
              res.send({ course });
            });
          })
          .catch(err => {
            return res.status(400).send();
          });
      })
      .catch(err => {
        res.status(400).send();
      });
  });

  app.put("/api/comments/:shortTitle", privateRoute, (req, res) => {
    CourseCollection.updateOne(
      {
        shortTitle: req.params.shortTitle,
        "comments.user.googleId": req.session.googleId
      },
      {
        $set: {
          "comments.$.content": req.body.content
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
        res.status(400).send();
      });
  });
};
