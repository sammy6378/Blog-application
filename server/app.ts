import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
export const app = express();
require('dotenv').config();

//body parser
app.use(express.json({limit: "50mb"})); 
app.use(express.urlencoded({extended: true}));

//cookie-parser
app.use(cookieParser());

//cors
const corsOptions = {
    origin: process.env.ORIGIN,
}

app.use(cors(corsOptions));

//test 
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({success: true, message: "API working correctly"});
})

//unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`The route: ${req.originalUrl} does not exist`) as any;
    error.statusCode = 404;
    next(error);
})

//404 page
app.use("/", (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({success: false, message: error.message})
})