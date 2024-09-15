import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../util/jwt";
import { ObjectId } from "mongoose";
/* 
user:
    get: /user:id
    post: /user
    put: /user:id
*/
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) {
            throw new Error('missing authorization');
        }
        const user = verifyJwt(authorization.split(' ')[1]);
        if(user == null) {
            throw new Error('unauthorized user');
        }
        const id: ObjectId | string= user.id;
        req.userId = id;
        next();
    }
    catch(e: any) {
        res.json({
            err: e.message
        }).status(401);
    }
}

export {
    verifyUser
}