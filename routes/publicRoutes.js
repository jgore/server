const CourseCollection = require("../models/Course")
const VideoCollection = require("../models/Video")

module.exports = (app) => {
    app.get("/api/courses", (req, res) => {
        CourseCollection.find({}, (err, docs) => {
            res.send(docs)
        })
    })
    app.get("/api/videos", (req, res) => {
        VideoCollection.find({}, (err, docs) => {
            res.send(docs)
        })
    })
}