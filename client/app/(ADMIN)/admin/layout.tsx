"use client";
import { Metadata } from "next";
import AdminClientLayout from "./AdminClientLayout";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import AdminProtected from "@/components/utils/protected/AdminProtected";
import Protected from "@/components/utils/protected/Protected";

/* export const metadata: Metadata = {
  title: "Admin Bloogify",
  description: "",
}; */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mount, setMount] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMount(true), []);
  if (!mount) return <Loading />;
  return (
    <Protected>
      <AdminProtected>
        <div>
          <AdminClientLayout />
          <main className="flex justify-between">
            <Sidebar />

            <div
              className={`flex-1 700:ml-64 ml-[30px] fixed right-0 left-0 top-[80px] max-700:top-[150px] p-4 overflow-y-auto h-screen ${pathname === "/admin/profile" && "max-700:top-[40px]"}`}
            >
              {children}
            </div>
          </main>
        </div>
      </AdminProtected>
    </Protected>
  );
}
