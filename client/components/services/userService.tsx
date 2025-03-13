import { AxiosError } from "axios";
import createApi from "../utils/axiosApi";

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
