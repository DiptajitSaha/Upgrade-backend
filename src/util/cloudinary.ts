
import { v2 as cloudinary} from "cloudinary";
import { unlinkSync } from 'fs';
import { cloudinary_config } from "../config";

cloudinary.config({
    cloud_name: cloudinary_config.cloud_name,
    api_key: cloudinary_config.api_key,
    api_secret: cloudinary_config.api_secret
});

const uploadToCloud = async (filePath: string | null) => {
    try {
        if(!filePath) {
            throw new Error('file path invalid');
        }
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
            access_mode: 'public'
        });
        unlinkSync(filePath);
        return {
            public_id: res.public_id,
            url: res.secure_url
        }
    }
    catch(e: any) {
        console.log(e.message);
        return new Error(e.message);
    }
}

export default uploadToCloud;