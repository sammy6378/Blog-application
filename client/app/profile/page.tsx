"use client"

import { useContextFunc } from "@/components/context/AppContext";

export default function Profile() {
    const {userInfo} = useContextFunc();
    return (
        <section className="w-full max-h-screen flex items-center justify-center">
            <div className="bg-gray-800 h-1/2 w-[600px] max-w-[90%]">
            
            </div>
        </section>
    )
}