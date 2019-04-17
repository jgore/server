const CourseCollection = require("../models/Course");
const UserCollection = require("../models/User");

module.exports = app => {
  app.post("/api/reviews", (req, res) => {
    let { shortTitle, content, grade, googleId } = req.body.opinion;
    console.log(googleId);
    UserCollection.findOne({ googleId })
      .then(user => {
        if (!user) {
          return res.status(401).send();
        }
        console.log(user);
        CourseCollection.updateOne(
          { shortTitle },
          {
            $push: {
              reviews: {
                content,
                grade,
                user,
                createdAt: new Date()
              }
            }
          }
        )
          .then(doc => {
            if (doc.nModified == 1) {
              return res.send(doc);
            }
          })
          .catch(err => {
            console.log(err);
            return res.status(400).send();
          });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send();
      });
  });
};
