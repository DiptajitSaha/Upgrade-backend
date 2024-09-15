/* courses:
    post: /course
    put: /course/buy:id
*/

import { Request, Response, Router } from "express";
import { getAllCourses, getCourse, getMyBoughtCourses, getMyPublishes, publishCourse } from "../controllers/course.controller";
import { verifyUser } from "../middlewares/user.middleware";
import { upload } from "../middlewares/multer.middleware";
import multer from "multer";
import uploadToCloud from "../util/cloudinary";

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

// get one course
course.get('/:id', async (req, res) => {
    const courseId = req.params.id;
    const course = await getCourse(courseId);
    res.json({
        data: course.data
    }).status(course.status);
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
    const course = publishCourse(courseId, req.userId);

})

course.post('/create', verifyUser, upload, async (req: Request, res: Response) => {

    if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    try {
        const uploadResults = await Promise.all(
            req.files.map(async (file) => {
                const result = await uploadToCloud(file.path);
                return result;
            })
        );

        res.status(200).json({ message: 'Videos uploaded successfully!', files: uploadResults });
    } catch (uploadError: any) {
        res.status(500).json({ error: uploadError.message });
    }

})