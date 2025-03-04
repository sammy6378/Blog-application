import { AxiosError } from "axios";
import createApi from "../utils/axiosApi";

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
export const authRegister = async (data: RegisterUserData) => {
  try {
    const response = await createApi.post("/user/register", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// user/login
export const authLogin = async (userData: loginData) => {
  try {
    const response = await createApi.post("/user/login", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// user/activate-user
export const activateUser = async (
  activation_code: string,
  activation_token: string
) => {
  try {
    const response = await createApi.post(`/user/activate-you`, {
      activation_code,
      activation_token,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "User activation failed"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

//logout user
export const logoutUser = async () => {
  try {
    const response = await createApi.post(
      "/user/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

//update access token
export const updateAccessToken = async() => {
  try {
    const response = await createApi.post("/user/update-token", {}, {withCredentials: true});
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError) {
      throw error;
    }
    else {
      throw new Error("oops... error refreshing token")
    }
  }
}

//get-user-info
export const getUserInfo = async() => {
  try {
    const response = await createApi.get('/user/get-user-info', {withCredentials: true});
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "oops...failed to fetch user");
    } else {
      throw new Error("Error occurred fetching user");
    }
  }
}