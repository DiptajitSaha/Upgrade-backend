
import { Request, Response, Router } from "express";
import { createCourse, getAllCourses, getCourse, getMyPublishes, publishCourse } from "../controllers/course.controller";
import { verifyUser } from "../middlewares/user.middleware";
import { upload } from "../middlewares/multer.middleware";
import { uploadToCloudinary } from "../middlewares/course.middleware";
import { getMyBoughtCourses } from "../controllers/account.controller";

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
    if (!userId) {
        res.json({
            err: 'unauthorized user'
        }).status(401);
        return;
    }
    const courses = await getMyBoughtCourses(userId);
    res.json({
        data: courses.data
    }).status(courses.status);
});

// get publishes
course.get('/publishes', verifyUser, async (req: Request, res: Response) => {

    const userId = req.userId;
    if (!userId) {
        res.json({
            err: 'unauthorized user'
        }).status(401);
        return;
    }
    const courses = await getMyPublishes(userId);
    res.json({
        data: courses.data
    }).status(courses.status);
});

// publish course
course.put('/publishes/:id', verifyUser, async (req: Request, res: Response) => {
    const courseId = req.params.id;
    if (!req.userId) {
        res.json({
            err: 'unauthorized user'
        }).status(401);
        return;
    }
    const course = await publishCourse(courseId, req.userId);
    res.json({
        data: course.data
    }).status(course.status);
})

// post new course
course.post('/create', verifyUser, upload, uploadToCloudinary, async (req: Request, res: Response) => {
    const course = req.course;
    //@ts-ignore
    course?.author = req.userId;
    console.log(course);
    
    if(!course) {
        res.json({
            err: 'upload failed',
        }).status(500);
        return;
    }
    const uploadedCourse = await createCourse(course);
    res.json({
        data: uploadedCourse.data
    }).status(uploadedCourse.status);
})

// get one course
course.get('/:id', async (req, res) => {
    const courseId = req.params.id;
    const course = await getCourse(courseId);
    res.json({
        data: course.data
    }).status(course.status);
});