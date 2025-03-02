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
import { logoutUser } from "../services/authService";

interface IContext {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  activationToken: string | null;
  setActivationToken: Dispatch<SetStateAction<string | null>>;
  handleLogout: () => void;
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

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setAccessToken(access_token);
    }
  }, []);

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
        toast.success(response.message);
        redirectToLogin();
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("oops... error occurred on logout");
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        activationToken,
        setActivationToken,
        handleLogout,
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
