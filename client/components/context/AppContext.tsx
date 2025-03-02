"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IContext {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  activationToken: string | null,
  setActivationToken: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<IContext | undefined>(undefined);

export default function ProviderFunction({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [activationToken, setActivationToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{accessToken, setAccessToken, activationToken, setActivationToken }}>
      {children}
    </AppContext.Provider>
  );
}

export const useContextFunc = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context not found");
  return context;
};
