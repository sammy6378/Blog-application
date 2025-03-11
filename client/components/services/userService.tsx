import { AxiosError } from "axios";
import createApi from "../utils/axiosApi";

export const updateAvatar = async (avatar: string) => {
    try {
        const response = await createApi.post('/update-avatar', { avatar }, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.message || "Error when fetching update avatar route");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}