import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import userModel, { IUser } from "../models/userModel";
import blogModel from "../models/blogModel";

//Add New Blog
export const addBlog = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const userId = req.user?._id;
      const user = (await userModel.findById(userId)) as IUser;

      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      if (!data.title || !data.content || !data.body) {
        return next(new ErrorHandler("Title, description and content are required", 400));
      }

      if (thumbnail) {
        try {
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "Blogs",
          });
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Thumbnail upload failed", 500));
        }
      }

      //save new blog to database
      const newBlog = await blogModel.create(data);

      res
        .status(200)
        .json({ success: true, newBlog, message: "Blog created successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Update Blog

//Get Single Blog

//Get All Blogs

//Add Comment to Blog

//Add Comment Reply

//Add Review to Blog

//Add Reply to Review

//tags

//add video 

//update video

//Delete video

//Delete Blog
