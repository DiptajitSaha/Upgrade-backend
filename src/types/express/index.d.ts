import { Request } from 'express';
import { Types } from 'mongoose';

declare module 'express' {
  export interface Request {
    userId?: Types.ObjectId | string,
    courseID?: Types.ObjectId | string
    course?: {
      title: string,
      author: Types.ObjectId,
      price: number,
      description: string,
      thumbnailLink: string,
      videos: Array<{
        videoId: number,
        videoLink: string
      }> | null
    }
  }
}