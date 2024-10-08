import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + String(Math.round(Math.random() * 1e9));
        callback(null, file.fieldname + '-' + uniqueSuffix);
    },
})
export const upload = multer({
    storage
}).fields([
    { name: 'videos', maxCount: 10 },
    { name: 'thumbnail', maxCount: 1 }
]);
