import { Schema } from "mongoose";

const videoSchema = new Schema({
    videoId: {
        type: Number,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    }
});

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avaterLink: {
        type: String
    },
    myCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    purchasedCourse: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    thumbnailLink: {
        type: String,
        required: true
    },
    videos: {
        type: [videoSchema],
        require: true
    }
});

export {UserSchema, CourseSchema};