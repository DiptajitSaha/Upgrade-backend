import { sign, verify } from 'jsonwebtoken';
import { app_config } from '../config';
import { ObjectId } from 'mongoose';

const verifyJwt = (token: string) => {
    try {
        const user: any = verify(token, app_config.jwt_secret);
        return user.id;
    }
    catch (e: any) {
        console.log(e.message);
        return null;
    }
}

const signJwt = (userDetails: {
    id: ObjectId | string,
    email: string,
    firstName: string,
    lastName: string,
    avaterLink?: string
}) => {
    const token: string = sign(userDetails, app_config.jwt_secret);
    return token;
}

export {
    verifyJwt,
    signJwt
}