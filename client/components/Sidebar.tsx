"use client";

import React, { useEffect, useState } from "react";
import { Home, FileText, Users, Settings, X, Menu, LogOut, LogOutIcon, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { useContextFunc } from "./context/AppContext";
import OutsideClickHandler from "react-outside-click-handler";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";

function Sidebar() {
  const { openAdminSidebar, setOpenAdminSidebar, handleLogout } = useContextFunc();
  const [mount, setMount] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    // Disable body scrolling when sidebar is open
    if (openAdminSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to reset body overflow
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAdminSidebar]);

  if (!mount) return null;

  return (
    <div className="">
      {/* open sidebar */}
      {!openAdminSidebar && (
        <div
          title="open-sidebar"
          className="cursor-pointer 700:hidden mb-10"
          onClick={() => setOpenAdminSidebar(true)}
        >
          <Menu className="top-[90px] z-[900] mr-[20px] max-500:mr-[10px] m-[16px] cursor-pointer" />
        </div>
      )}
      {/* Sidebar */}
      <OutsideClickHandler onOutsideClick={() => setOpenAdminSidebar(false)}>
        <section
          className={`fixed left-0 h-screen dark:bg-gray-900 bg-slate-100 w-64 transform transition-transform max-700:translate-x-0 z-[900] mr-[10px] max-700:mr-0 max-700:absolute max-700:max-h-screen max-700:overflow-y-hidden max-700:top-[80px] top-[80px] shadow-lg shadow-slate-500 dark:shadow-sm dark:shadow-slate-300 ${!openAdminSidebar && "max-700:-translate-x-full"} ${!openAdminSidebar && "max-700:hidden"} `}
        >
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-2xl max-500:text-lg font-bold">Bloogify</h1>
            <button
              className="700:hidden"
              onClick={() => setOpenAdminSidebar(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav>
            <ul>
              <Link
                href={"/admin/dashboard"}
                className={`p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center mb-1 ${pathname === "/admin/dashboard" && "dark:bg-gray-800 bg-gray-300"}`}
              >
                <Home className="mr-4" /> Dashboard
              </Link>
              <Link
                href={"/admin/dashboard/users"}
                className={`p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center mb-1 ${pathname.startsWith("/admin/dashboard/users") && "dark:bg-gray-800 bg-gray-300"}`}
              >
                <Users className="mr-4" /> Users
              </Link>
              <Link
                href={"/admin/dashboard/blogs"}
                className={`p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center mb-1 ${pathname.startsWith("/admin/dashboard/blogs") && "dark:bg-gray-800 bg-gray-300"}`}
              >
                <FileText className="mr-4" /> Blogs
              </Link>
              <Link
                href={"/admin/dashboard/settings"}
                className={`p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center mb-1 ${pathname.startsWith("/admin/dashboard/settings") && "dark:bg-gray-800 bg-gray-300"}`}
              >
                <Settings className="mr-4" /> Settings
              </Link>
              {/* logout button */}
              <button
                onClick={handleLogout}
                className="p-4 cursor-pointer flex items-center mb-1 w-full bg-red-500/90 hover:bg-red-500/80 mt-10"
              >
                <LucideLogOut className="mr-4" /> Logout
              </button>
            </ul>
          </nav>
        </section>
      </OutsideClickHandler>
      {/* Overlay for small screens */}
      {openAdminSidebar && (
        <div className="fixed inset-0 bg-black dark:bg-opacity-50 bg-opacity-[5%] 700:hidden"></div>
      )}
    </div>
  );
}

export default Sidebar;
