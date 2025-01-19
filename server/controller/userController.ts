import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import userModel, { IUser } from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import path from "path";
import { sendMail } from "../utils/mail";
import { sendToken } from "../utils/jwt";
require('dotenv').config();


//Register user
interface IRegisterUser {
    name: string,
    email: string,
    password: string,
    avatar?: string,
}

export const RegisterUser = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body as IRegisterUser;
        if(!name || !email || !password) {
            return next(new ErrorHandler("Please provide all the inputs", 400));
        }

        const isEmailExist = await userModel.findOne({email});
        if(isEmailExist) {
            return next(new ErrorHandler("Email already exists", 409));
        }

        const user: IRegisterUser = {
            name,
            email,
            password
        }

        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
        const data = {user: {name: user.name}, activationCode};
   
        try {
            await sendMail({
                template:"Activate-email.ejs",
                subject: "Account Activation👌",
                data,
                email: user.email,
            })

<<<<<<< HEAD

            res.status(201).json({success: true, message: `Activation code sent to ${user.email}`});
=======
            res.status(201).json({success: true, message: `Activation code sent to ${user.email}`, activationToken: activationToken.token});
>>>>>>> 1cba060ef770e6daacd067d83cc39e48a3601960

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

//create activation token
interface IActivationToken {
    activationCode: string,
    token: string
}

const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(Math.random() * 9000 + 1000).toString(); // 4-digit code
    const token = jwt.sign({user, activationCode}, process.env.ACTIVATION_SECRET as string, {
        expiresIn: "5m"
    });

    return {activationCode, token}

}

//Activate user
export const ActivateUser = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {activation_token, activation_code} = req.body;

        const verifyToken = jwt.verify(activation_token, process.env.ACTIVATION_SECRET as string) as {user: IUser, activationCode: string};

        if(activation_code !== verifyToken.activationCode) {
            return next(new ErrorHandler("Activation code not valid", 400));
        };

        const newUser = verifyToken.user;
        const user = await userModel.create({
            name: newUser.name,
            password: newUser.password,
            email: newUser.email,
        })

        res.status(201).json({success: true, message: "User created successfully", user});

        
    }catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }
})

//login
interface ILoginUser {
    password: string,
    email: string,
}

export const userLogin = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, email} = req.body as ILoginUser;
        if(!password || !email) {
            return next(new ErrorHandler("Please provide all the fields", 400));
        }

        const user = await userModel.findOne({email});
        if(!user) {
            return next(new ErrorHandler("email or password is invalid", 400));
        }

        const passwordCorrect = await user.comparePasswords(password);
        if(!passwordCorrect) {
            return next(new ErrorHandler("email or password is invalid", 400));
        }

        //create cookies
        try {
            await sendToken(user, res);
            
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})