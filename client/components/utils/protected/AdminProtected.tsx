"use client"
import { useContextFunc } from "@/components/context/AppContext";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { userInfo, loadingContext } = useContextFunc();
  const router = useRouter();

  useEffect(() => {
    if (!loadingContext && userInfo !== null && userInfo?.role !== "admin") {
      router.push("/");
    }
  }, [loadingContext, userInfo]);

  if (loadingContext && userInfo === null) {
    return <div><Loader /></div>;
  }

  if (userInfo?.role !== "admin") {
    return null; // Prevent rendering children if not an admin
  }

  return <>{children}</>;
}