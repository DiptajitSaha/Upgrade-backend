
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

const buyCourse = async (courseId: Types.ObjectId | string, userId: Types.ObjectId | string) => {
    try {
        const course = await Course.findById(courseId);
        if(!course) throw new Error('Invalid course Id');
        const user = await User.findById(userId);
        if(!user) throw new Error('Invalid User');
        if(!user.purchasedCourse.includes(course._id)) {
            user.purchasedCourse.push(course._id);
        }
        else {
            throw new Error('Already owned!');
        }
        await user.save();
        return {
            status: 200,
            data: {
                courses: user.purchasedCourse
            }
        };
    }
    catch(e: any) {
        return {
            status: 401,
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
        if(course.author._id != userId) {
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
        const res = await Course.find({
            published: true
        });
        if(!res) {
            throw new Error('no courses found');
        }
        const courses = res.map(i => {
            return {
                _id: i._id,
                title: i.title,
                author: i.author,
                price: i.price,
                description: i.description,
                thumbnailLink: i.thumbnailLink
            }
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


const getCourse = async (courseId: Types.ObjectId | string, userId: Types.ObjectId | string | null) => {
    try{
        const course = await Course.findById(courseId);
        if(!course) {
            throw new Error('course not found');
        }
        if(userId == null) {
            return {
                status: 200,
                data: {
                    course: {
                        _id: course._id,
                        title: course.title,
                        price: course.price,
                        description: course.description,
                        thumbnailLink: course.thumbnailLink,
                    }
                }
            }
        }
        const user = await User.findById(userId);
        if(!user || !user.purchasedCourse.includes(new Types.ObjectId(courseId))) {
            return {
                status: 200,
                data: {
                    course: {
                        _id: course._id,
                        title: course.title,
                        price: course.price,
                        description: course.description,
                        thumbnailLink: course.thumbnailLink,
                    }
                }
            }
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
    createCourse, 
    buyCourse, 
    publishCourse,
    getCourse,
    getMyPublishes
};