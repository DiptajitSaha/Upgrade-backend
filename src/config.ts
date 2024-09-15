export const app_config = {
    port: process.env.PORT || 3000,
    db_uri: process.env.DB_URI || "",
    jwt_secret: process.env.JWT_SECRET || ""
}

export const cloudinary_config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}