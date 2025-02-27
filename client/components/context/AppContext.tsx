"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IContext {
  url: string;
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  activationToken: null,
  setActivationToken: Dispatch<SetStateAction<null>>;
}

export const AppContext = createContext<IContext | undefined>(undefined);

export default function ProviderFunction({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState("");
  const [activationToken,setActivationToken] = useState(null);
  const url = "http://localhost:8000";

  return (
    <AppContext.Provider value={{ url, accessToken, setAccessToken, activationToken, setActivationToken }}>
      {children}
    </AppContext.Provider>
  );
}

export const useContextFunc = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};
