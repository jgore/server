const mongoose = require('mongoose')
const { Schema } = mongoose

const videoSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    shortDescription: {
        type: String,
        default: ""
    }
})

const VideoCollection = mongoose.model('videos', videoSchema)
module.exports = VideoCollection