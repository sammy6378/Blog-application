import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import userModel, { IUser } from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import validator from "validator";
import { sendMail } from "../utils/mail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import cloudinary from "cloudinary";
require("dotenv").config();

//Register user
interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const RegisterUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as IRegisterUser;
      if (!name || !email || !password) {
        return next(new ErrorHandler("Please provide all the inputs", 400));
      }

      //validate email
      const isValidEmail = validator.isEmail(email);
      if (!isValidEmail) {
        return next(new ErrorHandler("Incorrect email format", 400));
      }

      //validate password
      const isValidPassword = validator.isStrongPassword(password);
      if (!isValidPassword) {
        return next(
          new ErrorHandler(
            "Password should be at least 8 characters, have at least one uppercase letter, one numerical value and one special character",
            400
          )
        );
      }

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 409));
      }

      const user: IRegisterUser = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activate-email.ejs"),
        data
      );
      try {
        await sendMail({
          template: "activate-email.ejs",
          subject: "Account Activation👌",
          data,
          email: user.email,
        });

        res.status(201).json({
          success: true,
          message: `Activation code sent to ${user.email}`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//create activation token
interface IActivationToken {
  activationCode: string;
  token: string;
}

const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(Math.random() * 9000 + 1000).toString(); // 4-digit code
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as string,
    {
      expiresIn: "5m",
    }
  );

  return { activationCode, token };
};

//Activate user
export const ActivateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body;

      const verifyToken = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (activation_code !== verifyToken.activationCode) {
        return next(new ErrorHandler("Activation code not valid", 400));
      }

      const newUser = verifyToken.user;
      const user = await userModel.create({
        name: newUser.name,
        password: newUser.password,
        email: newUser.email,
      });

      res
        .status(201)
        .json({ success: true, message: "User created successfully", user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login
interface ILoginUser {
  password: string;
  email: string;
}

export const userLogin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email } = req.body as ILoginUser;
      if (!password || !email) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("email or password is invalid", 400));
      }

      const passwordCorrect = await user.comparePasswords(password);
      if (!passwordCorrect) {
        return next(new ErrorHandler("email or password is invalid", 400));
      }

      //create cookies
      try {
        await sendToken(user, res);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout user
export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const redisUser = req.user?._id as string;
      if (redisUser) {
        console.log("User session deleted from redis");
        await redis.del(redisUser);
      } else {
        console.log(`user: ${redisUser} not found in redis`);
      }

      res.status(200).json({ success: true, message: "User logged out" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access-token
export const UpdateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        return next(new ErrorHandler("Refresh token not found", 401));
      }

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new ErrorHandler("Refresh token not found", 401));
      }

      //const user = userModel.findById(decoded.id);
      const session = (await redis.get(decoded.id)) as string;
      const user = JSON.parse(session);
      req.user = user;

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "7d" }
      );

      //create new cookies
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      res.status(200).json({ success: true, accessToken });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get user info
export const getUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        return next(new ErrorHandler(`user: ${userId} not found`, 404));
      }

      res.status(200).json({ success: true, user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user password
interface IPassword {
  oldPassword: string;
  newPassword: string;
}
export const updateUserPass = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IPassword;
      const userId = req.user?._id;
      const user = await userModel.findById(userId).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found. Please login", 401));
      }

      //ensure both fields are provided
      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please provide both old and new password", 400)
        );
      }

      //compare old password with user password
      const isPasswordCorrect = await user.comparePasswords(oldPassword);
      if (!isPasswordCorrect) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }

      //ensure newpassword is different from old password
      const newPasswordDifferent = await user.comparePasswords(newPassword);
      if (newPasswordDifferent) {
        return next(
          new ErrorHandler(
            "New Password should be different from old password",
            409
          )
        );
      }

      user.password = newPassword;
      await user?.save();
      // Clear the tokens for user to login again
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      redis.set(userId as string, JSON.stringify(user));

      const data = {
        email: user.email,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/update-password.ejs"),
        data
      );

      await sendMail({
        email: user.email,
        template: "update-password.ejs",
        subject: "User Password Updated",
        data,
      });

      res.status(200).json({
        success: true,
        user,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user info
interface IUpdateUser {
  name?: string;
  email?: string;
}

export const updateUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUser;
      const userId = req.user?._id as string;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found. Please login", 401));
      }

      const oldEmail = user.email;

      if (!name && !email) {
        return next(new ErrorHandler("Please provide at least one input", 400));
      }

      if (email) {
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler(`Email: ${email} already exists`, 409));
        }
        user.email = email;
        // Clear the tokens
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
      }

      
      if (user && name) user.name = name;

      await user.save();

      redis.set(userId, JSON.stringify(user));

      const data = {
        name: user?.name,
        oldEmail,
        newEmail: user.email,
      };
      // console.log(data);
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/update-user-info.ejs"),
        data
      );

      if (email) {
        try {
          await sendMail({
            subject: "Editing User Info",
            email: user?.email as string,
            data,
            template: "update-user-info.ejs",
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 400));
        }
      }

      res.status(200).json({
        success: true,
        user,
        message: `user info updated. Email sent to ${user?.email}`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user avatar
export const updateUserAvatar = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;
      const userId = req.user?._id as string;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(
          new ErrorHandler("User not found. Please login again", 404)
        );
      }

      if (avatar && user) {
        if (user.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "blogAvatars",
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "blogAvatars",
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user.save();
      redis.set(userId, JSON.stringify(user));
      res
        .status(200)
        .json({ success: true, user, message: "User profile updated" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//social auth
//github, google, facebook
interface ISocialAuth {
  email: string;
  name: string;
  avatar?: string;
}

export const socialAuth = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuth;
      if (!email && !name) {
        return next(new ErrorHandler("Email and name should be provided", 400));
      }
      const user = (await userModel.findOne({ email })) as IUser;
      if (!user) {
        let avatarData = {};
        if (avatar) {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "blogAvatars",
          });
          avatarData = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
        const newUser = await userModel.create({
          email,
          name,
          avatar: avatarData,
        });
        sendToken(newUser, res);
      } else {
        sendToken(user, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
