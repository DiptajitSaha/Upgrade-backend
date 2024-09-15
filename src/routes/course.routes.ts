/* courses:
    get: /course:id -> bought courses
    put: /course:id -> publish
    post: /course
    put: /course/buy:id
*/

import { Request, Response, Router } from "express";
import { getAllCourses, getCourse, getMyCourses } from "../controllers/course.controller";
import { verifyUser } from "../middlewares/user.middleware";

export const course = Router();
// get featured
course.get('/browse', async (req, res) => {
    const courses = await getAllCourses();
    res.json({
        data: courses.data
    }).status(courses.status);
});

// get my purchases
course.get('/mycourses', verifyUser, async (req: Request, res: Response) => {
    const userId = req.userId;
    if(!userId) {
        res.json({
            err: 'unauthorized user'
        }).status(401);
        return;
    }
    const courses = await getMyCourses(userId);
    res.json({
        data: courses.data
    }).status(courses.status);
});

// get one course
course.get(':id', async (req, res) => {
    const courseId = req.params.id;
    const course = await getCourse(courseId);
    res.json({
        data: course.data
    }).status(course.status);
});

// get publishes
course.get('/publishes', verifyUser, async (req: Request, res: Response) => {
    const userId = req.userId;
    if(!userId) {
        res.json({
            err: 'unauthorized user'
        }).status(401);
        return;
    }
    const courses = await get(userId);
    res.json({
        data: courses.data
    }).status(courses.status);
});