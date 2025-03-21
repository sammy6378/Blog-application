import { Metadata } from "next"
import AdminClientLayout from "./AdminClientLayout"
import Sidebar from "@/components/Sidebar"

export const metadata: Metadata = {
    title: "Admin Bloogify",
    description: ""
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AdminClientLayout />
            <main className="flex">
                <div>
                <Sidebar />
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
