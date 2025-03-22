import { AxiosError } from "axios";
import createApi from "../utils/axiosApi";

//update user avatar
export const updateAvatar = async (avatar: string) => {
  try {
    const response = await createApi.put("/user/update-avatar", {avatar}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Error when fetching update avatar route"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

//update user info(name and email)
export const updateInfo = async(data: {name: string, email?: string}) => {
    try {
        const response = await createApi.put("/user/update-info", data, {withCredentials: true});
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
              error.response?.data.message ||
                "Error updating user info"
            );
          } else {
            throw new Error("An unexpected error occurred");
          }
    }
}


//update user password
export const updatePassword = async(data: {oldPassword: string, newPassword: string}) => {
    try {
        const response = await createApi.put("/user/update-password", data, {withCredentials: true});
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
              error.response?.data.message ||
                "Error updating user password"
            );
          } else {
            throw new Error("An unexpected error occurred");
          } 
    }
}

//get all users
export const getAllUsers = async () => {
  try {
    const response = await createApi.get("/user/get-users", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("Error occurred fetching users");
    }
  }
};