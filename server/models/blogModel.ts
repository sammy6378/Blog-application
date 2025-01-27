import mongoose, {Document, Schema, Model} from 'mongoose';
import { IUser } from './userModel';

interface IBlogLink extends Document {
    title: string,
    url: string,
}

interface IComment extends Document {
    user: IUser,
    comment: string,
    commentReplies?: IComment[]
}

interface IBlogReview extends Document {
    user: IUser,
    review: string,
    reviewReplies?: IBlogReview[]
}

interface IVideo extends Document {
    title: string,
    description: string,
    videoUrl: string,
    videoThumbnail: {
        public_id: string,
        url: string,
    },
    links: IBlogLink[],
}

interface IBlog extends Document {
    title: string,
    description: string,
    thumbnail: {
        public_id: string,
        url: string,
    },
    videos: IVideo[],
    reviews: IBlogReview[],
    rating: number,
    links: IBlogLink[],
    likes: number,
    dislikes: number,
    comments: IComment[],
    category: string,
    author: IUser,
    tags: Object
}

//schemas
//link schema
const linkSchema = new Schema<IBlogLink>({
    title: String,
    url: {
        required: true, 
        type: String
    }
})

//comment schema
const commentSchema = new Schema<IComment>({
    user: {
        type: Object,
        comment: {
            type: String,
            required: true,
        },
        commentReplies: [Object]
    }
})

//review schemma
const reviewSchema = new Schema<IBlogReview>({
    user: Object,
    review: {
        type: String,
        required: true,
    },
    reviewReplies: [Object]
})

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl:String,
    videoThumbnail:{
        type: String,
        required: true,
    },
    links: [Object]
})

const blogSchema = new Schema<IBlog>({

})