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
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IContext | undefined>(undefined);

export default function ProviderFunction({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");
  const url = "http://localhost:8001";

  return (
    <AppContext.Provider value={{ url, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}

export const useContextFunc = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};
