import { sign, verify } from 'jsonwebtoken';
import { app_config } from '../config';

const verifyJwt = (token: string) => {
    try {
        const user: any = verify(token, app_config.jwt_secret);
        return user.id;
    }
    catch(e: any){
        console.log(e.message);
        return null;
    } 
}

const signJwt = (userDetails: {
    email: string
    password: string,
    firstName: string,
    lastName: string,
    avaterLink?: string
}) => {
    try {
        const token: string = sign(userDetails, app_config.jwt_secret);
        return token;
    }
    catch(e: any){
        console.log(e.message);
        return null;
    }
}

export {
    verifyJwt,
    signJwt
}