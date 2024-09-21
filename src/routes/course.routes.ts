
import { Request, Response, Router } from "express";
import { buyCourse, createCourse, getAllCourses, getCourse, getMyPublishes, publishCourse } from "../controllers/course.controller";
import { decodeUserid, verifyUser } from "../middlewares/user.middleware";
import { upload } from "../middlewares/multer.middleware";
import { uploadToCloudinary } from "../middlewares/course.middleware";
import { getMyBoughtCourses } from "../controllers/account.controller";

export const course = Router();

// get featured
course.get('/browse', async (req, res) => {
    const courses = await getAllCourses();
    res.status(courses.status).json({
        data: courses.data
    });
});

// get my purchases
course.get('/mycourses', verifyUser, async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({
            err: 'unauthorized user'
        });
        return;
    }
    const courses = await getMyBoughtCourses(userId);
    res.status(courses.status).json({
        data: courses.data
    });
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
    res.status(courses.status).json({
        data: courses.data
    });
});

// publish course
course.put('/publish/:id', verifyUser, async (req: Request, res: Response) => {
    const courseId = req.params.id;
    if (!req.userId) {
        res.status(401).json({
            err: 'unauthorized user'
        });
        return;
    }
    const course = await publishCourse(courseId, req.userId);
    res.status(course.status).json({
        data: course.data
    });
})

// buy course
course.put('/buy/:id', verifyUser, async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({
            err: 'unauthorized user'
        });
        return;
    }
    const course = await buyCourse(courseId, userId);
    res.status(course.status).json({
        data: course.data
    });
});

// post new course
course.post('/create', verifyUser, upload, uploadToCloudinary, async (req: Request, res: Response) => {
    const course = req.course;
    // @ts-ignore
    course?.author = req.userId;
    
    if(!course) {
        res.status(500).json({
            err: 'upload failed',
        });
        return;
    }
    const uploadedCourse = await createCourse(course);
    res.status(uploadedCourse.status).json({
        data: uploadedCourse.data
    });
})

// get one course
course.get('/:id', decodeUserid, async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const userId = req.userId;
    const course = await getCourse(courseId, (userId ? userId : null));
    res.status(course.status).json({
        data: course.data
    });
});