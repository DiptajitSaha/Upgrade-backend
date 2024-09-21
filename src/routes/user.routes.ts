import { Router, Request, Response } from "express";
import { createUser, getUserInfo, Login, updateUserInfo } from "../controllers/account.controller";
import { signJwt } from "../util/jwt";
import { verifyUser } from "../middlewares/user.middleware";

export const users = Router();

users.post('/signup', async (req: Request, res: Response) => {
    try{
        const userDetails: {
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            avaterLink?: string
        } = req.body.userDetails;
        const user = await createUser(userDetails);
        if(user.status >= 400) {
            res.status(user.status).send(user.data);
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
        res.status(401).json({
            err: e.message
        });
    }
});

users.post('/login', async (req: Request, res: Response) => {
    try{
        const userDetails: {
            email: string
            password: string,
        } = req.body.userDetails;
        
        const user = await Login(userDetails);
        if(user.status >= 400){
            res.status(user.status).send(user.data);
            return;
        }
        const token = signJwt(user.data);
        res.status(200).json({
            msg: 'logged in successfully',
            data:{
                token
            }
        });
    }
    catch(e: any) {
        console.log(e.message);
        res.status(401).json({
            err: e.message
        });
    }
});

users.get('/', verifyUser, async (req: Request, res: Response) => {
    try{
        if(!req.userId) throw new Error('invalid credential');
        const user = await getUserInfo(req.userId);
        if(user.status >= 400){
            res.status(user.status).send(user.data);
            return;
        }
        res.status(200).json({
            msg: 'user details retrived successfully',
            data: {
                user: user.data
            }
        });
    }
    catch(e: any) {
        res.status(401).json({
            err: e.message
        });
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
        } = req.body.update;
        if(!req.userId) throw new Error('invalid credential');

        const user = await updateUserInfo(req.userId, update);

        if(user.status >= 400){
            res.status(user.status).send(user.data);
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
        res.status(401).json({
            err: e.message
        });
    }
})
