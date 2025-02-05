import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = async(error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    error.message = error.message || "Internal server error";
    error.statusCode = error.statusCode || 500;

    //mongodb objectid error
    if(error.message === "CastError") {
        const message = `Invalid resource: ${error.path} does not exists`;
        return next(new ErrorHandler(message, 401));
    }

    //duplicate resource
    if(error.statusCode === 11000) {
        const message = `Duplicate resource: ${Object.keys(error.keyValue)} is invalid`;
        return next(new ErrorHandler(message, 409));
    }

    //invalid token error
    if(error.name === "JsonWebTokenError") {
        const message = "Invalid token. Please login again";
        return next(new ErrorHandler(message, 401));
    }

    //token expired error
    if(error.name === "TokenExpiredError") {
        const message = "Token has expired. Please login again";
        return next(new ErrorHandler(message, 401));
    }

    res.status(error.statusCode).json({success: false, message: error.message});

}