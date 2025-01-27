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
    comment: string,
    commentReplies?: IComment[]
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

const reviewSchema = new Schema<IBlogReview>({

})

const videoSchema = new Schema<IVideo>({

})

const blogSchema = new Schema<IBlog>({

})