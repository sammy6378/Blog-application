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

const LinkSchema = new Schema<IBlogLink>({

})

const commentSchema = new Schema<IComment>({

})

const reviewSchema = new Schema<IBlogReview>({

})

const videoSchema = new Schema<IVideo>({

})

const blogSchema = new Schema<IBlog>({
    
})