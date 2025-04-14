import { Axios, AxiosError } from "axios";
import createApi from "../utils/axiosApi";

export interface ICreateVideo {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: string;
  links: string[];
}

interface ICreateBlog {
  title: string;
  description: string;
  body: string;
  category: string;
  tags: string[];
  thumbnail: string;
  videos: ICreateVideo[];
  links: string[];
}

export interface IUpdateBlog {
  title?: string;
  description?: string;
  body?: string;
  category?: string;
  tags?: string[];
  thumbnail?: string;
  videos?: Array<{
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: string;
    links: string[];
  }>;
  links?: string[];
}

export interface IBlog {
  title: string;
  description: string;
  body: string;

  category: string;

  videos: ICreateVideo[]; // Adjust this type if you know the structure of videos
  // Adjust this type if you know the structure of reviews
  links: string[];
  // Adjust this type if you know the structure of comments
  tags: string[];
  thumbnail: {
    public_id: string;
    url: string;
  };
}

//get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await createApi.get("/blogs/get-blogs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Axios error occurred while fetching blogs"
      );
    } else {
      console.log("Error fetching blogs");
    }
  }
};

//create new blog
export const createNewBlog = async (data: ICreateBlog) => {
  try {
    const response = await createApi.post("/blogs/create-blog", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Axios error occurred when creating blogs"
      );
    } else {
      console.log("Error creating blogs");
    }
  }
};

//update blog - //api/blogs/update-blog:/id
export const updateBlog = async (data: IUpdateBlog, id: string) => {
  try {
    const response = await createApi.put(`/blogs/update-blog/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "Axios Error when updating blog"
      );
    } else {
      console.log("Error updating blog");
    }
  }
};

//delete blog - //api/blogs/delete-blog:/id
export const deleteBlog = async (id: string) => {
  try {
    const response = await createApi.delete(`/api/blogs/delete-blog/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message || "Axios Error when updating blog"
      );
    } else {
      console.log("Error fetching blogs");
    }
  }
};
