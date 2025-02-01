import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./userModel";

interface IBlogLink extends Document {
  title: string;
  url: string;
}

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

interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: {
    public_id: string;
    url: string;
  };
  links: IBlogLink[];
}

interface ITag extends Document {
  tag: string;
}

interface IBlog extends Document {
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
  links: IBlogLink[];
  likes: number;
  dislikes: number;
  comments: IComment[];
  category: string;
  author: IUser;
  tags: ITag[];
}

//schemas
//tag schema
const tagSchema = new Schema<ITag>({
  tag: String,
});
//link schema
const linkSchema = new Schema<IBlogLink>({
  title: String,
  url: {
    required: true,
    type: String,
  },
});

//comment schema
const commentSchema = new Schema<IComment>({
  user: Object,
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
    type: String,
    required: true,
  },
  links: [Object],
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
    links: [linkSchema],
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
    tags: [tagSchema],
  },
  { timestamps: true }
);

const blogModel: Model<IBlog> = mongoose.model("Blog", blogSchema);
export default blogModel;
