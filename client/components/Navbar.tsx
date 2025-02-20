"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="w-full dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white transition duration-500 shadow mb-1 border-b h-[80px] font-poppins">
      <section className="flex justify-between items-center h-full w-[95%] mx-auto">
        <Link href={"/"}>
          <Image
            src={"/favicon.svg"}
            width={100}
            height={100}
            alt="logo"
            className="dark:bg-white rounded-full w-[50px] h-[50px] max-700:w-[40px] max-700:h-[40px] max-500:w-[35px] max-500:h-[35px]"
          />
        </Link>
        <div className="flex justify-between gap-[50px] max-800:gap-[30px] max-700:gap-[25px] ">
          <ul className="flex items-center gap-5 font-[500] max-800:gap-3">
            <li>
              <Link href={"/"} className={`hover:text-crimson dark:hover:text-green transition`}>Home</Link>
            </li>
            <li className="flex items-center hover:text-crimson dark:hover:text-green transition cursor-pointer">
              <span>Category</span>
              <ChevronDown className="" />
            </li>
            <li>
              <Link href={"/contact"} className={`hover:text-crimson dark:hover:text-green transition`}>Contact Us</Link>
            </li>
          </ul>

          <div className="flex gap-4 items-center">
            {/* switch modes */}
            {theme === "light" ? (
              <Moon
                onClick={() => setTheme("dark")}
                className="cursor-pointer text-black dark:text-white hover:text-slate-800 duration-500"
              />
            ) : (
              <Sun
                onClick={() => setTheme("light")}
                className="cursor-pointer hover:text-slate-300 dark:text-white text-black duration-500"
              />
            )}

            <button className="dark:bg-green hover:opacity-90 bg-crimson px-4 py-1 rounded duration-500">Login</button>
          </div>
        </div>
      </section>
    </nav>
  );
}
