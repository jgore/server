const mongoose = require('mongoose')
const { Schema } = mongoose

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    technologies: {
        type: Array
    },
    reviews: {
        type: Array
    }
})

const CoursesCollection = mongoose.model('courses', courseSchema)
module.exports = CoursesCollection