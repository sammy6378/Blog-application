"use client";
import { FaCamera,  } from "react-icons/fa";
import { EditIcon,MailWarningIcon } from "lucide-react";

import { useContextFunc } from "@/components/context/AppContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { VscWarning } from "react-icons/vsc";

export default function Profile() {
  const { userInfo } = useContextFunc();
  const { data } = useSession();
  return (
    <section className="w-full max-h-screen flex items-center justify-center ">
      <div className="bg-gray-800 -z-[10] text-white dark:text-gray-900 dark:bg-white h-1/2 w-[600px] max-w-[90%] flex flex-col items-center justify-center p-3 mt-4 rounded-md shadow">
        <section className="relative">
          <Image
            src={userInfo?.avatar?.url || data?.user?.image || "/profile.webp"}
            alt="avatar"
            width={30}
            height={30}
            className="w-[100px] h-[100px] max-500:w-[80px] max-500:h-[80px] max-300px:w-[60px] max-300px:h-[60px] rounded-full object-cover"
            unoptimized
            priority
          />
          <FaCamera className="absolute bottom-0 right-0 cursor-pointer" />
        </section>
        {/* name and email */}
        <section className="mt-8 flex flex-col gap-2 dark:shadow border border-slate-500 dark:border-slate-300 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4">
          <p className="font-semibold">{userInfo?.name}</p>
          <hr className="dark:w-[80%] dark:max-500:w-full gray-slate-500 w-0" />
          <p className="dark:text-gray-700 text-gray-400">{userInfo?.email}</p>
          <EditIcon className="absolute -bottom-2 right-2 cursor-pointer dark:bg-white bg-gray-800" />
        </section>

        <button className="mt-8 flex flex-col gap-2 dark:shadow border border-slate-500 dark:border-slate-300 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4 bg-[#37a39a] hover:opacity-90 transition">Update Password</button>

        <button className="flex flex-row justify-center gap-2 dark:shadow border border-slate-500 dark:border-slate-300 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4 bg-crimson hover:opacity-90 transition"><span className="place-self-center">Delete Account</span><VscWarning className="absolute left-2" size={25} /></button>
      </div>
    </section>
  );
}
