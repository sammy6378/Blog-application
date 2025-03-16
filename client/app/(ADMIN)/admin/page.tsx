"use client"
import AdminProtected from "@/components/utils/protected/AdminProtected";
import Protected from "@/components/utils/protected/Protected";


export default function AdminHome() {
    return (
        <Protected>
        <AdminProtected>    
            <div></div>   
        </AdminProtected>
        </Protected>
    )
}