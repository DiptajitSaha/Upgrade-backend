import { Request } from 'express';
import { Types } from 'mongoose';

declare module 'express' {
  export interface Request {
    userId?: Types.ObjectId | string,
    courseID?: Types.ObjectId | string
  }
}