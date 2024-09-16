import { Router, Request, Response } from "express";
import { createUser, getUserInfo, Login, updateUserInfo } from "../controllers/account.controller";
import { signJwt } from "../util/jwt";
import { verifyUser } from "../middlewares/user.middleware";

export const users = Router();

users.post('/signup', async (req: Request, res: Response) => {
    try{
        const userDetails: {
            email: string
            password: string,
            firstName: string,
            lastName: string,
            avaterLink?: string
        } = req.body;
        const user = await createUser(userDetails);
        if(user.status >= 400) {
            res.send(user.data).status(user.status);
            return;
        }
        const token = signJwt(user.data);
        res.json({
            msg: 'account created successfully',
            data:{
                token
            }
        }).status(200);
    }
    catch(e: any) {
        res.json({
            err: e.message
        }).status(401);
    }
});

users.get('/login', async (req: Request, res: Response) => {
    try{
        const userDetails: {
            email: string
            password: string,
        } = req.body;
        const user = await Login(userDetails);
        if(user.status >= 400){
            res.send(user.data).status(user.status);
            return;
        }
        const token = signJwt(user.data);
        res.json({
            msg: 'logged in successfully',
            data:{
                token
            }
        }).status(200);
    }
    catch(e: any) {
        res.json({
            err: e.message
        }).status(401);
    }
});

users.get('/', verifyUser, async (req: Request, res: Response) => {
    try{
        if(!req.userId) throw new Error('invalid credential');
        const user = await getUserInfo(req.userId);
        if(user.status >= 400){
            res.send(user.data).status(user.status);
            return;
        }
        const token = signJwt(user.data);
        res.json({
            msg: 'user details retrived successfully',
            data:{
                token
            }
        }).status(200);
    }
    catch(e: any) {
        res.json({
            err: e.message
        }).status(401);
    }
})

users.put('/update', verifyUser, async (req: Request, res: Response) => {
    try{
        const update: {
            password: string,
            firstName?: string,
            lastName?: string,
            newPassword?: string,
            avaterLink?: string
        } = req.body
        if(!req.userId) throw new Error('invalid credential');

        const user = await updateUserInfo(req.userId, update);

        if(user.status >= 400){
            res.send(user.data).status(user.status);
            return;
        }
        const token = signJwt(user.data);
        res.json({
            msg: 'user details updated successfully',
            data:{
                token
            }
        }).status(200);
    }
    catch(e: any) {
        res.json({
            err: e.message
        }).status(401);
    }
})
