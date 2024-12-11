import mongoose from "mongoose";
import { CourseSchema, UserSchema } from "../model";

mongoose.connect(process.env.DATABASE_URL).then(
    (res) => {
        console.log('established database connection successfully\n');
    }
).catch((err) => {
    console.log(err);
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


export {User, Course};
