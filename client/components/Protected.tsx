"use client";

import { useEffect } from "react";
import { useContextFunc } from "./context/AppContext";
import { useRouter } from "next/navigation";
import Loader from "./Loader/Loader";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { loadingContext, accessToken } = useContextFunc();
  const router = useRouter();

  useEffect(() => {
    if (!loadingContext && accessToken === null) {
      router.push("/user/login");
    }
  }, [accessToken, loadingContext]);

  if (loadingContext) {
    return <div><Loader /></div>;
  }

  return <>{children}</>;
}
