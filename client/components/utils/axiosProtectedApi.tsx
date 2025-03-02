import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";

//axios interceptor for protected routes
const axiosProtectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000/api",
  withCredentials: true,
});

//Attach the interceptor only to this instance.
axiosProtectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Please log in to access this resource");
      const loginUrl = window.location.origin + "/user/login";
      Router.push(
        `${loginUrl}?redirect=${encodeURIComponent(window.location.href)}`
      );
    }
    return Promise.reject(error);
  }
);

export default axiosProtectedApi;