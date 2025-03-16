import { Metadata } from "next"
import AdminClientLayout from "./AdminClientLayout"

export const metadata: Metadata = {
    title: "Admin Bloogify",
    description: ""
}

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <AdminClientLayout />
            <main>{children}</main>
        </div>
    )
}