
import { ObjectId } from "mongoose";
import { User } from "../db";

const createUser = async (userDetails: {
    email: string
    password: string,
    firstName: string,
    lastName: string,
    avaterLink?: string
}) => {
    try{
        const user = await User.create(userDetails);
        return {
            status: 200,
            data: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avaterLink: user.avaterLink
            }
        }
    }
    catch (e: any){
        return {
            status: 401,
            data: e.message
        };
    }
}

const updateUserInfo = async (id: ObjectId, update: {
    firstName?: string,
    lastName?: string,
    password?: string,
    avaterLink?: string
}) => {
    try{
        const user = await User.findByIdAndUpdate(id, update);
        if(!user) throw new Error('user not found');
        return {
            status: 200,
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avaterLink: user.avaterLink
            }
        }
    }
    catch(e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}

const getUserInfo = async (id: ObjectId) => {
    try{
        const user = await User.findById(id);
        if(!user) throw new Error('user not found');
        return {
            status: 201,
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avaterLink: user.avaterLink
            }
        }
    }
    catch(e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}


export { updateUserInfo, getUserInfo, createUser};