import { AxiosError } from "axios";
import createApi from "../utils/api";


interface RegisterUserData {
    name: string;
    email: string;
    password: string;
  }
  
  interface loginData {
    email: string;
    password: string;
  }

// user/register
export const authRegister = async (data:RegisterUserData) =>{
    try {
        const response = await createApi.post('/user/register',data);
        return response.data;
        
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Registration failed");
        }else{
        throw new Error("An unexpected error occurred");
        }
        
    }
}


// user/login
export const authLogin = async (userData:loginData) =>{
    try {
        const response = await createApi.post('/user/login',userData);
        return response.data;
        
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Login failed");
        }else{
        throw new Error("An unexpected error occurred");
        }
        
    }
}


// user/activate-user
export const activateUser = async (token:string) =>{
    try {
        const response = await createApi.get(`/user/activate-user/${token}`);
        return response.data;
        
    } catch (error) {
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "User activation failed");
        }else{
        throw new Error("An unexpected error occurred");
        }
        
    }
}