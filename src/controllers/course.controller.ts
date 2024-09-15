
import { ObjectId } from "mongoose";
import { Course } from "../db";

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

export { getAllCourses, getMyCourses, createCourse};