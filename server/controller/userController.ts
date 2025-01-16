import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import userModel from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import path from "path";
import { sendMail } from "../utils/mail";
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

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activate-email.ejs"), data);
        try {
            await sendMail({
                template:"activate-email.ejs",
                subject: "Account Activation👌",
                data,
                email: user.email,
            })

            res.status(201).json({success: true, message: `Activation code sent to ${user.email}`});

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