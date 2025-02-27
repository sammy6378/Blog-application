import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

const createApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default createApi;
