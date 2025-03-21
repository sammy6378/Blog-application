"use client";

import React, { useEffect, useState } from "react";
import { Home, FileText, Users, Settings, X, Menu } from "lucide-react";
import Link from "next/link";
import { useContextFunc } from "./context/AppContext";
import OutsideClickHandler from 'react-outside-click-handler'

function Sidebar() {
  const { openAdminSidebar, setOpenAdminSidebar } = useContextFunc();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <div className="">
      {/* open sidebar */}
      {!openAdminSidebar && (
        <div title="open-sidebar" className=" max-700:w-full max-700:h-screen 700:hidden">
        <Menu className="sticky top-[90px] z-[900] mr-[20px] m-[16px] cursor-pointer" onClick={() => setOpenAdminSidebar(true)} /></div>
      )}
      {/* Sidebar */}
      <OutsideClickHandler onOutsideClick={() => setOpenAdminSidebar(false)}>
      <section
        className={`sticky top-0 bottom-0 left-0 h-screen dark:bg-gray-900 bg-slate-100 w-64 transform transition-transform max-700:translate-x-0 z-[900] mr-[20px] max-700:mr-0 max-700:absolute max-700:top-[80px] ${!openAdminSidebar && "max-700:-translate-x-full"} ${!openAdminSidebar && "max-700:hidden"} `}
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
              className="p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center"
            >
              <Home className="mr-4" /> Dashboard
            </Link>
            <Link
              href={"/admin/dashboard/users"}
              className="p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center"
            >
              <Users className="mr-4" /> Users
            </Link>
            <Link
              href={"/admin/dashboard/blogs"}
              className="p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center"
            >
              <FileText className="mr-4" /> Blogs
            </Link>
            <Link
              href={"/admin/dashboard/settings"}
              className="p-4 dark:hover:bg-gray-800 hover:bg-gray-300 cursor-pointer flex items-center"
            >
              <Settings className="mr-4" /> Settings
            </Link>
          </ul>
        </nav>
      </section>
</OutsideClickHandler>
      {/* Overlay for small screens */}
      {/*   {openAdminSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setOpenAdminSidebar(false)}
        ></div>
      )} */}
    </div>
  );
}

export default Sidebar;
