
import { Types } from "mongoose";
import { User } from "../db";

const createUser = async (userDetails: {
    email: string
    password: string,
    firstName: string,
    lastName: string,
    avaterLink?: string
}) => {
    try {
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
    catch (e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}

const updateUserInfo = async (id: Types.ObjectId | string, update: {
    firstName?: string,
    lastName?: string,
    password: string,
    newPassword?: string,
    avaterLink?: string
}) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('user not found');
        if(user.password != update.password) {
            throw new Error('invalid password');
        }
        await user.updateOne({
            firstName: update.firstName ? update.firstName : user.firstName,
            lastName: update.lastName ? update.lastName : user.lastName,
            password: update.newPassword ? update.newPassword : user.password,
            avaterLink: update.avaterLink ? update.avaterLink : user.avaterLink,
        });
        await user.save();
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
    catch (e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}

const Login = async (userDetails: {
    email: string,
    password: string
}) => {
    try {
        const user = await User.findOne({
            email: userDetails.email,
            password: userDetails.password
        });
        if (!user) throw new Error('user not found');
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
    catch (e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}

const getUserInfo = async (id: Types.ObjectId | string) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('user not found');
        return {
            status: 201,
            data: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avaterLink: user.avaterLink
            }
        }
    }
    catch (e: any) {
        return {
            status: 401,
            data: e.message
        };
    }
}

export {
    updateUserInfo,
    getUserInfo,
    createUser,
    Login
};