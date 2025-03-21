import { Metadata } from "next";
import AdminClientLayout from "./AdminClientLayout";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Admin Bloogify",
  description: "",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminClientLayout />
      <main className="flex">
        <Sidebar />

        <div className="flex-1 mt-[16px]">{children}</div>
      </main>
    </div>
  );
}
