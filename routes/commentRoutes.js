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
      return res.status(400).send({});
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
              comments: {
                $each: [
                  {
                    content,
                    user: user._doc,
                    createdAt: new Date()
                  }
                ],
                $position: 0
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
            return res.status(400).send({});
          });
      })
      .catch(err => {
        res.status(400).send({});
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
        res.status(400).send({});
      });
  });

  app.post("/api/comments/delete", privateRoute, (req, res) => {
    let { shortTitle, _id } = req.body,
      googleId = req.session.googleId;
    console.log(shortTitle, _id);
    UserCollection.findOne({ googleId })
      .then(user => {
        if (!user) {
          return res.status(401).send({});
        }
        CourseCollection.update(
          {
            shortTitle
          },
          {
            $pull: {
              comments: { _id, "user.googleId": googleId }
            }
          }
        )
          .then(stats => {
            if (stats.nModified === 0) {
              return res.status(304).send({});
            }
            res.send();
          })
          .catch(err => {
            res.status(400).send({});
          });
      })
      .catch(err => {
        res.status(400).send({});
      });
  });
};
