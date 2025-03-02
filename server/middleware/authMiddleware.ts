import { Request, Response, NextFunction } from "express";


import { catchAsyncErrors } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from "../utils/redis";
import { IUser } from "../models/userModel";
require('dotenv').config();

export const authMiddleware = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token;
        if(!access_token) {
            return next(new ErrorHandler("Session not found. Please log in again...", 401));
        }

        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
        if(!decoded) {
            return next(new ErrorHandler("Authentication failed", 401));
        };

       // const user = await userModel.findById(decoded.id);
       const user = await redis.get(decoded.id);
       if(!user) {
        return next(new ErrorHandler("User session not found. Please log in", 404));
       }

       req.user = JSON.parse(user);
       next();
        
    } catch (error: any) {
        console.log("Authentication failed");
    }
})


//authorize middleware
export const authorizeRoles = (...roles: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`The role: ${req.user?.role} is not allowed`, 403));
        }
        next();
    }
}