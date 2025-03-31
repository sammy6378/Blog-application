import { Axios, AxiosError } from 'axios';
import createApi from '../utils/axiosApi';

interface ICreateVideo {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: string;
    links: string[];
  }

interface ICreateBlog {
    title: string,
    description: string,
    body: string,
    category: string,
    tags: string[],
    thumbnail: string,
    videos: ICreateVideo[],
    links: string[],
}


//get all blogs
export const getAllBlogs = async() => {
    try {
        const response = await createApi.get('/blogs/get-blogs', {withCredentials: true});
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Axios error occurred while fetching blogs");
        } else {
            console.log("Error fetching blogs");
        }
    }
}

//create new blog 
export const createNewBlog = async(data: ICreateBlog) => {
    try {
        const response = await createApi.post('/blogs/create-blog', data, {withCredentials: true});
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Axios error occurred when creating blogs")
        }
        else {
            console.log("Error creating blogs");
        }
    }
}