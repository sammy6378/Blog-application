import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const createApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

createApi.interceptors.response.use((response) => response, (error) => {
    if(error.response && error.response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user")
    }
    return Promise.reject(error);
})

export default createApi;
