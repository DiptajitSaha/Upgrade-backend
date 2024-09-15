import mongoose from "mongoose";
import { CourseSchema, UserSchema } from "../model";

mongoose.connect('mongodb+srv://DiptajitSaha:kazuha%402612!@test.1ouzkou.mongodb.net/Upgrade').then(
    (res) => {
        console.log('established database connection successfully\n');
    }
).catch((err) => {
    console.log(err);
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


export {User, Course};