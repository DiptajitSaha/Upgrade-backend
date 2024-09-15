import { Request } from 'express';
import { ObjectId } from 'mongoose';

declare module 'express' {
  export interface Request {
    userId?: ObjectId | string,
    courseID?: ObjectId | string
  }
}