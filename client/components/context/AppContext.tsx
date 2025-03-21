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
import { signOut, useSession } from "next-auth/react";
import { getAllUsers } from "../services/userService";
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
}

interface IUserInfo {
  avatar: {
    public_id: string;
    url: string;
  };
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface IAllUsers {
  allUsers: IUserInfo[];
}

interface IUserCount {
  userCount: number;
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
  const [userCount, setUserCount] = useState<IUserCount | 0>(0);
  const [loadingContext, setLoadingContext] = useState(true);
  const [openAdminSidebar, setOpenAdminSidebar] = useState(false);

  //check access token on mount
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setAccessToken(access_token);
      updateAccessTokenFunc().then(() => fetchUserInfo());
      //console.log(`usser: ${userInfo}`);
      getUsers();
    }
    setLoadingContext(false);
  }, []);

  //get all users
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        setAllUsers(response.allUsers);
        setUserCount(response.userCount);
        console.log(response.allUsers);
        console.log(response.userCount);
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response?.status);
      }
      else {
        console.log("Error fetching users");
      }
    }
  };

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
          console.log(user_info);
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
        console.log(error.response.status);
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
