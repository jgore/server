const CourseCollection = require("../models/Course")

module.exports = (app) => {
    app.get("/api/courses", (req, res) => {
        CourseCollection.find({}, (err, docs) => {
            res.send(docs)
        })
    })
}