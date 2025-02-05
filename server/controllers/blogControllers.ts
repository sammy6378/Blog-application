import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import userModel, { IUser } from "../models/userModel";
import blogModel, { IVideo } from "../models/blogModel";
import path from "path";
import ejs from "ejs";
import { sendMail } from "../utils/mail";

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

      let videoData = [];
      const videos = data.videos as IVideo[];
      if (videos && videos.length > 0) {
        //access a single video
        for (const video of videos) {
          if (video.videoThumbnail) {
            try {
              const myCloud = await cloudinary.v2.uploader.upload(
                video.videoThumbnail as any,
                {
                  folder: "Blog-Videos",
                }
              );
              videoData.push({
                ...video,
                videoThumbnail: {
                  public_id: myCloud.public_id,
                  url: myCloud.url,
                },
              });
            } catch (error) {
              return next(
                new ErrorHandler("Video thumbnail upload failed", 500)
              );
            }
          } else {
            videoData.push(video);
          }
        }
      }

      data.videos = videoData;

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

      //update videos
      const videos = data.videos as IVideo[];
      if (videos && videos.length > 0) {
        let videoData = [];
        for (const video of videos) {
          if (video.videoThumbnail) {
            const existingVideo = blog.videos.find(v => v._id as string === video._id);
            if (existingVideo && existingVideo.videoThumbnail.public_id) {
              // Destroy the existing thumbnail from Cloudinary
              await cloudinary.v2.uploader.destroy(existingVideo.videoThumbnail.public_id);
            }
            try {
              const myCloud = await cloudinary.v2.uploader.upload(video.videoThumbnail as any, {
                folder: "Blog-Videos",
              });
              videoData.push({
                ...video,
                videoThumbnail: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
                },
              });
            } catch (error) {
              return next(new ErrorHandler("Video thumbnail upload failed", 500));
            }
          } else {
            videoData.push(video);
          }
        }
        data.videos = videoData;
      }
      const updatedBlog = await blogModel.findByIdAndUpdate(
        blogId,
        {
          $set: data,
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({
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
        .json({ success: true, blog, message: "Blog fetched successfully" });
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
interface IAddComment {
  comment: string;
  blogId: string;
}
export const addBlogComment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      const user = await userModel.findById(userId);
      const { comment, blogId } = req.body as IAddComment;
      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      if (!comment || !blogId) {
        return next(new ErrorHandler("Please provide all fields", 400));
      }

      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      const commentData: any = {
        user: req.user,
        comment,
      };

      blog.comments.push(commentData);
      await blog?.save();

      const data = {
        user: req.user?.name,
        comment: commentData.comment,
        blogTitle: blog.title,
      };

      //send email to admin
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/new-comment.ejs"),
        data
      );

      try {
        await sendMail({
          subject: "New Comment😁",
          email: blog.author.email,
          data,
          template: "new-comment.ejs",
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(200).json({ success: true, blog, message: "Comment added" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Add Comment Reply
interface IAddBlogComment {
  blogId: string;
  reply: string;
  commentId: string;
}

export const addBlogCommentReply = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      const user = await userModel.findById(userId);
      const { blogId, reply, commentId } = req.body as IAddBlogComment;

      if (!blogId || !reply || !commentId) {
        return next(new ErrorHandler("A field is missing", 400));
      }

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      const findComment = blog.comments.find(
        (item: any) => item._id.toString() === commentId
      );
      if (!findComment) {
        return next(
          new ErrorHandler(`Comment with id: ${commentId} not found`, 404)
        );
      }

      const replyData: any = {
        user: req.user,
        comment: reply,
      };

      findComment.commentReplies?.push(replyData);
      await blog.save();

      const data = {
        comment: findComment.comment.slice(0, 10),
        user: findComment.user.name,
      };

      try {
        await sendMail({
          data,
          subject: "Comment Reply",
          template: "comment-reply.ejs",
          email: findComment.user.email,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(200).json({ success: true, blog, message: "Reply added." });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Add Review to Blog
interface IReview {
  review: string;
  rating: number;
  blogId: string;
}
export const addReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { review, rating, blogId } = req.body as IReview;
      if (!review || !rating || !blogId) {
        return next(new ErrorHandler("Missing fields", 400));
      }
      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      //find blog
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      const reviewData: any = {
        user: req.user,
        rating,
        review,
      };

      blog.reviews.push(reviewData);

      let totalRating = 0;
      blog.reviews.forEach((rev: any) => {
        totalRating += rev.rating;
      });

      blog.rating = totalRating / blog.reviews.length;
      await blog.save();

      res.status(200).json({ success: true, blog });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Add Reply to Review --admin
interface IReviewReply {
  blogId: string;
  comment: string;
  reviewId: string;
}
export const addReviewReply = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogId, comment, reviewId } = req.body as IReviewReply;
      if (!blogId || !comment) {
        return next(new ErrorHandler("Missing data", 400));
      }
      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
      }

      const review = blog.reviews.find(
        (rev: any) => rev._id.toString() === reviewId
      );

      const replyData: any = {
        user: req.user,
        comment,
      };

      review?.reviewReplies?.push(replyData);
      await blog.save();

      res.status(200).json({ success: true, blog });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//tags

//add video

//update video

//Delete video

//Delete Blog
