import { Request, Response, NextFunction } from "express";
import uploadToCloud from "../util/cloudinary";
import { upload } from "./multer.middleware";
import multer from "multer";
interface FileObject {
    [fieldname: string]: Express.Multer.File[]; // Index signature to handle dynamic field names
}

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as FileObject;

    if (!req.files || typeof req.files !== 'object') {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const course: any = req.body;

    // Initialize the videos array and thumbnail variable
    course.videos = [];
    course.thumbnail = '';

    try {
        // Upload videos
        if (files['videos']) {
            const videoFiles = files['videos'] as Express.Multer.File[];
            await Promise.all(
                videoFiles.map(async (file, index) => {
                    const result = await uploadToCloud(file.path);
                    if (!result) {
                        throw new Error('Upload failed for video');
                    }
                    course.videos.push({
                        videoId: index,
                        videoLink: result.url
                    });
                })
            );
        }

        // Upload thumbnail
        if (files['thumbnail']) {
            const thumbnailFile = files['thumbnail'][0] as Express.Multer.File;
            const result = await uploadToCloud(thumbnailFile.path);
            if (!result) {
                throw new Error('Upload failed for thumbnail');
            }
            course.thumbnailLink = result.url;
        }

        // Attach the updated course to the request object
        req.course = course;
        next();

    } catch (uploadError: any) {
        res.status(500).json({ error: uploadError.message });
    }
}