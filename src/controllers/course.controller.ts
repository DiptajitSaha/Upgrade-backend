
import { Types } from "mongoose";
import { Course, User } from "../db";

const createCourse = async (courseDetails: {
    title: string,
    author: Types.ObjectId | string,
    price: number,
    description: string,
    thumbnailLink: string,
    published?: boolean,
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

const buyCourse = async (userId: Types.ObjectId | string, courseId: Types.ObjectId | string) => {
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

const publishCourse = async (CourseId: Types.ObjectId | string, userId: Types.ObjectId | string) => {
    try{
        const course = await Course.findById(CourseId);
        if(!course) {
            throw new Error('invalid course id');
        }
        if(course.author.equals(userId)) {
            throw new Error('unauthorized author');
        }
        course.published = true;
        await course.save();
        return {
            status: 200,
            data: {
                course
            }
        };
    }
    catch(e: any) {
        return {
            status: 402,
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

const getMyPublishes = async (id: Types.ObjectId | string) => {
    try{
        const courses = await Course.find({
            author: id
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

const getMyBoughtCourses = async (id: Types.ObjectId | string) => {
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
            status: 401,
            data: e.message
        }
    }
}

const getCourse = async (id: Types.ObjectId | string) => {
    try{
        const course = await Course.findById(id);
        if(!course) {
            throw new Error('course not found');
        }
        return {
            status: 200,
            data: {
                course
            }
        }
    }
    catch(e: any) {
        return {
            status: 402,
            data: e.message
        }
    }
}

export { 
    getAllCourses, 
    getMyBoughtCourses, 
    createCourse, 
    buyCourse, 
    publishCourse,
    getCourse,
    getMyPublishes
};