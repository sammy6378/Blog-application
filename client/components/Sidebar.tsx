"use client";

import React, { useState } from "react";
import { Home, FileText, Users, Settings, X, Menu } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen dark:bg-gray-900 bg-slate-100 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div className="text-2xl font-bold">Bloogify</div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <ul>
            <Link
              href={"/admin/dashboard"}
              className="p-4 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <Home className="mr-4" /> Dashboard
            </Link>
            <Link
              href={"/admin/dashboard/users"}
              className="p-4 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <Users className="mr-4" /> Users
            </Link>
            <Link
              href={"/admin/dashboard/blogs"}
              className="p-4 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <FileText className="mr-4" /> Blogs
            </Link>
            <Link
              href={"/admin/dashboard/settings"}
              className="p-4 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <Settings className="mr-4" /> Settings
            </Link>
          </ul>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
