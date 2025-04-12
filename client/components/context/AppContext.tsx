"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  getUserInfo,
  logoutUser,
  updateAccessToken,
} from "../services/authService";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { getAllUsers } from "../services/userService";
import { getAllBlogs } from "../services/blogService";
//import { useAxiosInterceptor } from "../utils/axiosProtectedApi";

interface IContext {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  activationToken: string | null;
  setActivationToken: Dispatch<SetStateAction<string | null>>;
  handleLogout: () => void;
  userInfo: IUserInfo | null;
  setUserInfo: Dispatch<SetStateAction<IUserInfo | null>>;
  loadingContext: boolean;
  openAdminSidebar: boolean;
  setOpenAdminSidebar: (openAdminSidebar: boolean) => void;
  allUsers: IAllUsers | null;
  setAllUsers: (allUsers: IAllUsers | null) => void;
  userTotal: number | null;
  setUserTotal: Dispatch<SetStateAction<number | null>>;
  blogs: IBlog[] | null;
  setBlogs: Dispatch<SetStateAction<IBlog[] | null>>,
  blogCount: number | null,
  setBlogCount:  Dispatch<SetStateAction<number | null>>,
  getBlogsFunc: () => Promise<void>;
  getUsers: () => Promise<void>
}

export interface IUserInfo {
  _id: string,
  avatar: {
    public_id: string;
    url: string;
  };
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface IAllUsers {
  allUsers: IUserInfo[];
}

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  body: string;
  rating: number;
  likes: number;
  dislikes: number;
  category: string;
  author: {
    avatar: {
      public_id: string;
      url: string;
    };
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  videos: IVideo[]; // Adjust this type if you know the structure of videos
  reviews: any[]; // Adjust this type if you know the structure of reviews
  links: string[];
  comments: any[]; // Adjust this type if you know the structure of comments
  tags: string[];
  thumbnail: {
    public_id: string,
    url: string,
  }
  createdAt: string;
  updatedAt: string;
}

export interface IVideo {
  title: string,
  description: string,
  videoUrl: string,
  videoThumbnail: string | {
    public_id: string,
    url: string, 
  },
  links: string[],
}

export const AppContext = createContext<IContext | undefined>(undefined);

export default function ProviderFunction({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [activationToken, setActivationToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [allUsers, setAllUsers] = useState<IAllUsers | null>(null);
  const [userTotal, setUserTotal] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [loadingContext, setLoadingContext] = useState(true);
  const [openAdminSidebar, setOpenAdminSidebar] = useState(false);

  //check access token on mount
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setAccessToken(access_token);
      updateAccessTokenFunc().then(() => fetchUserInfo().then(() => getBlogsFunc().then(() => getUsers())));
    }
    setLoadingContext(false);
  }, []);


  //get all users
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        setAllUsers(response.allUsers);
        setUserTotal(response.userCount);
        sessionStorage.setItem("all_users", JSON.stringify(response.allUsers));
        sessionStorage.setItem("user_count", JSON.stringify(response.userCount));
        //get
        const storeUsers = sessionStorage.getItem("all_users");
        const storeUserCount = sessionStorage.getItem("user_count");
        if (storeUsers) {
          const parsedUsers = JSON.parse(storeUsers);
          setAllUsers(parsedUsers);
         // console.log(parsedUsers);
        }
        if (storeUserCount) {
          const parsedUserCount = JSON.parse(storeUserCount);
          setUserTotal(parsedUserCount);
          //console.log(parsedUserCount);
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.status);
      } else {
        console.log("Error fetching users", error);
      }
    }
  };

  
  //get all blogs
  const getBlogsFunc = async() => {
    try {
      const response = await getAllBlogs();
      if(response.success) {
        setBlogs(response.blogs)
        setBlogCount(response.blogCount);

        //try session storage
        sessionStorage.setItem("all_blogs", JSON.stringify(response.blogs));
        sessionStorage.setItem("blog_count", JSON.stringify(response.blogCount));
        //get
        const storeBlogs = sessionStorage.getItem("all_blogs");
        const storeBlogCount = sessionStorage.getItem("blog_count");
        if (storeBlogs) {
          const parsedBlogs = JSON.parse(storeBlogs);
          setBlogs(parsedBlogs);
          console.log(parsedBlogs);
        }
        if (storeBlogCount) {
          const parsedBlogCount = JSON.parse(storeBlogCount);
          setBlogCount(parsedBlogCount);
          console.log(parsedBlogCount);
        }
      }
      else {
        console.log(response.message);
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else {
        console.log("Error fetching blogs");
      }
    }
  }

  //call update access token service
  const updateAccessTokenFunc = async () => {
    try {
      const response = await updateAccessToken();
      if (response.success) {
        //console.log(response);
        setAccessToken(response.accessToken);
        localStorage.setItem("access_token", response.accessToken);
      } else {
        setAccessToken(localStorage.getItem("access_token"));
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return;
        } else {
          console.log(error.response?.data.message);
        }
      } else {
        console.log("failed to update access token");
      }
    }
  };

  //fetch user
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        // console.log(response);
        localStorage.setItem("user", JSON.stringify(response.user));
        const user_info = localStorage.getItem("user");
        if (user_info) {
          setUserInfo(JSON.parse(user_info));
         // console.log(user_info);
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return;
        } else {
          console.log(error.response?.data.message);
        }
      } else {
        console.log("oops...failed to fetch user");
      }
    }
  };

  //redirect to login when accessing a feature that requires authentication
  const redirectToLogin = () => {
    const loginUrl = window.location.origin + "/user/login";
    router.push(
      `${loginUrl}?redirect=${encodeURIComponent(window.location.href)}`
    );
  };

  //logout function
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        setAccessToken(null);
        localStorage.removeItem("access_token");
        setUserInfo(null);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        toast.success(response.message);
        //signout without redirecting to home page, which conflicts with redirectToLogin
        await signOut({ redirect: false });
        redirectToLogin();
      } else {
        toast.success(response.message);
        //redirectToLogin();
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.log(error.response?.status);
        if (error.response?.status === 401) {
          toast.error("Session expired. Redirecting to login...");
          setAccessToken(null);
          redirectToLogin();
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
        }
      } else {
        toast.error("oops... error occurred on logout");
        console.log(error?.response?.status);
      }
    }
  };

  //useAxiosInterceptor(setUserInfo, setAccessToken);

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        activationToken,
        setActivationToken,
        handleLogout,
        userInfo,
        setUserInfo,
        loadingContext,
        openAdminSidebar,
        setOpenAdminSidebar,
        userTotal,
        setUserTotal,
        allUsers,
        setAllUsers,
        blogCount,
        setBlogCount,
        blogs,
        setBlogs,
        getBlogsFunc,
        getUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useContextFunc = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};
