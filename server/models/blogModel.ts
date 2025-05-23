import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./userModel";

/* interface IBlogLink extends Document {
  title: string;
  url: string;
} */

interface IComment extends Document {
  user: IUser;
  comment: string;
  commentReplies?: IComment[];
} 

interface IBlogReview extends Document {
  user: IUser;
  review: string;
  rating: number;
  reviewReplies?: IComment[];
}

export interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: {
    public_id: string;
    url: string;
  };
  links: string[];
}

export interface ITag extends Document {
  tag: string;
}

/* interface ILikeInfo {
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },
 blog: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Blog"
 }
}
interface IDisikeInfo {
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
 },
 blog: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Blog"
 }
} */

interface ILikeInfo {
  userId: string;
  blogId: string;
}

interface IDislikeInfo {
  userId: string;
  blogId: string;
}

export interface IBlog extends Document {
  blog: { userId: any; blogId: any; };
  title: string;
  description: string;
  body: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  videos: IVideo[];
  reviews: IBlogReview[];
  rating: number;
  links: string[];
  likes: number;
  dislikes: number;
  comments: IComment[];
  category: string;
  author: IUser;
  tags: string[];
  likeInfo: ILikeInfo[];
  dislikeInfo: IDislikeInfo[];
}

//schemas
//tag schema
/* const tagSchema = new Schema<ITag>({
  tag: String,
}); */
//link schema
/* const linkSchema = new Schema<IBlogLink>({
  title: String,
  url: {
    required: true,
    type: String,
  },
}); */

//comment schema
const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: {
    type: String,
    required: true,
  },
  commentReplies: [Object],
});

//review schemma
const reviewSchema = new Schema<IBlogReview>({
  user: Object,
  review: {
    type: String,
    required: true,
  },
  rating: Number,
  reviewReplies: [Object],
});

//video schema
const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: String,
  videoThumbnail: {
    public_id: String,
    url: String, 
  },
  links: [String],
});

//like info schema
const likeInfoSchema = new Schema<ILikeInfo>({
  userId: String,
  blogId: String,
});

//dislike info schema
const dislikeInfoSchema = new Schema<IDislikeInfo>({
  userId: String,
  blogId: String,
});

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    thumbnail: {
      public_id: String,
      url: String,
    },
    videos: [videoSchema],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    links: [String],
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    category: String,
    author: Object,
    tags: [String],
    likeInfo: [likeInfoSchema],
    dislikeInfo: [dislikeInfoSchema]
  },
  { timestamps: true }
);

const blogModel: Model<IBlog> = mongoose.model("Blog", blogSchema);
export default blogModel;
