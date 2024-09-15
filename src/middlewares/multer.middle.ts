import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/temp');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + String(Math.round(Math.random() * 1e9));
        callback(null, file.fieldname + '-' + uniqueSuffix);
    },
})

export const upload = multer({storage});