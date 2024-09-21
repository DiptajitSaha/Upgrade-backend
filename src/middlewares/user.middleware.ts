import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../util/jwt";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error('missing authorization');
        }
        const user = verifyJwt(authorization.split(' ')[1]);
        if (user == null) {
            throw new Error('unauthorized user');
        }
        req.userId = user;
        next();
    }
    catch (e: any) {
        res.status(401).json({
            err: e.message
        });
    }
}

const decodeUserid = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const user = verifyJwt(authorization.split(' ')[1]);
        req.userId = user;
    }
    next();
}

export {
    verifyUser,
    decodeUserid
}