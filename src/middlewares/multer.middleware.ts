import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/temp');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + String(Math.round(Math.random() * 1e9));
        callback(null, file.fieldname + '-' + uniqueSuffix);
    },
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /mp4|avi|mkv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Only video files are allowed!'));
};

export const upload = multer({
    storage,
    fileFilter
}).array('videos', 10);