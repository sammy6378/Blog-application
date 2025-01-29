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
      const user = (await userModel
        .findById(userId)
        .select("-password")) as IUser;

      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      if (!data.title || !data.description || !data.body) {
        return next(
          new ErrorHandler("Title, description and body are required", 400)
        );
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

      //add blog author
      data.author = user;

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
export const updateBlog = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const blogId = req.params.id;
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      if (thumbnail) {
        if (blog.thumbnail?.public_id) {
          await cloudinary.v2.uploader.destroy(blog.thumbnail?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "Blogs",
          });
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "Blogs",
          });
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      const updatedBlog = await blogModel.findByIdAndUpdate(
        blogId,
        {
          $set: data,
        },
        { new: true, runValidators: true }
      );

      res
        .status(200)
        .json({
          success: true,
          updatedBlog,
          message: "Blog updated successfully",
        });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get Single Blog
export const getBlog = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      // get blog by id
      const blogId = req.params.id;
      const blog = await blogModel.findById(blogId);

      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      res
        .status(200)
        .json({ success: true, blog, message: "Blog returned successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get All Blogs
export const getBlogs = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      // get all blogs
      const blogs = await blogModel.find();

      if (!blogs) {
        return next(new ErrorHandler("Blogs not found", 404));
      }

      res
        .status(200)
        .json({ succes: true, blogs, message: "Blogs fetched succefully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Add Comment to Blog

//Add Comment Reply

//Add Review to Blog

//Add Reply to Review

//tags

//add video

//update video

//Delete video

//Delete Blog
