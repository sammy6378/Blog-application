import { AxiosError } from 'axios';
import createApi from '../utils/axiosApi';


//get all blogs
export const getAllBlogs = async() => {
    try {
        const response = await createApi.get('/blogs/get-blogs', {withCredentials: true});
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "An error occurred while fetching blogs");
        } else {
            console.log("Error fetching blogs");
        }
    }
}