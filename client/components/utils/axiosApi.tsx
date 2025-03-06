import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const createApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
        
      }
      return Promise.reject(error);
    }
  );

export default createApi;
