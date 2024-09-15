
import { ObjectId } from "mongoose";
import { Course, User } from "../db";

const createCourse = async (id: ObjectId, courseDetails: {
    title: string,
    author: ObjectId,
    price: number,
    description: string,
    thumbnailLink: string,
    videos: Array<{
        videoId: number,
        videoLink: string
    }> | null
}) => {
    try{
        const course = await Course.create(courseDetails);
        return {
            status: 200,
            data: {
                course
            }
        }
    }
    catch(e: any) {
        return {
            status: 501,
            data: e.message
        }
    }
}

const buyCourse = async (userId: ObjectId, courseId: ObjectId) => {
    try {
        const course = await Course.findById(courseId);
        if(!course) throw new Error('Invalid courseId');
        const user = await User.findById(userId);
        if(!user) throw new Error('Invalid User');
        user.myCourses.push(course._id);
        return {
            status: 200,
            data: {
                courses: user.myCourses
            }
        };
    }
    catch(e: any) {
        return {
            status: 501,
            data: e.message
        }
    }
}

const publishCourse = async (id: ObjectId) => {
    try{
        const course = await Course.findByIdAndUpdate(id, {
            published: true
        });
        return {
            status: 200,
            data: {
                course
            }
        };
    }
    catch(e: any) {
        return {
            status: 501,
            data: e.message
        }
    }
}

const getAllCourses = async () => {
    try{
        const courses = await Course.find({
            published: true
        });
        return {
            status: 200,
            data: {
                courses
            }
        };
    }
    catch(e: any) {
        return {
            status: 501,
            data: e.message
        }
    }
}

const getMyCourses = async (id: ObjectId) => {
    try{
        const courses = await Course.find({
            author: id
        });
        return {
            status: 200,
            data: {
                courses
            }
        }
    }
    catch(e: any) {
        return {
            status: 501,
            data: e.message
        }
    }
}

export { getAllCourses, getMyCourses, createCourse, buyCourse, publishCourse};