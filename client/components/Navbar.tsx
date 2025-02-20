"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bar, setBar] = useState(false);
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
          <OutsideClickHandler onOutsideClick={() => setBar(false)}>
            <ul
              className={`flex items-center gap-5 font-[500] max-800:gap-3 max-700:block max-700:fixed max-700:top-[20px] max-700:dark:bg-white max-700:bg-gray-900 max-700:text-white max-700:dark:text-black max-700:p-2 max-700:w-[180px] max-700:max-w-full max-700:rounded max-700:right-2 max-300px:right-0 max-700:z-50 max-700:pt-4 max-700:h-[200px] max-200px:text-sm ${bar ? "max-700:block" : "max-700:hidden"}`}
            >
              <li className="max-700:mt-2 max-700:mb-2">
                <Link
                  href={"/"}
                  className={`hover:text-crimson dark:hover:text-green transition max-700:text-white max-700:dark:text-black`}
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center hover:text-crimson dark:hover:text-green transition cursor-pointer text-black dark:text-white max-700:dark:text-black max-700:text-white max-700:my-5">
                <span>Category</span>
                <ChevronDown className="" size={15} />
              </li>
              <li className="max-700:mb-5">
                <Link
                  href={"/contact"}
                  className={`hover:text-crimson dark:hover:text-green transition`}
                >
                  Contact Us
                </Link>
              </li>
              <button className="dark:bg-green hover:opacity-90 bg-crimson px-2 py-1 rounded duration-500 700:hidden ">
                Login
              </button>
            </ul>
          </OutsideClickHandler>
          <div className="flex gap-4 items-center">
            {/* switch modes */}
            {theme === "light" ? (
              <Moon
                onClick={() => setTheme("dark")}
                className="cursor-pointer text-black dark:text-white hover:text-slate-800"
                fill="black"
              />
            ) : (
              <Sun
                onClick={() => setTheme("light")}
                className="cursor-pointer hover:text-slate-300 dark:text-white text-black"
                fill="black"
              />
            )}

            {bar ? (
              <X
                className="cursor-pointer z-[100] dark:text-black text-white"
                size={24}
                onClick={() => setBar(!bar)}
              />
            ) : (
              <span
                className="cursor-pointer z-[100] dark:text-white"
                onClick={() => setBar(!bar)}
              >
                <HiOutlineMenuAlt3 size={24} />
              </span>
            )}

            <button className="dark:bg-green hover:opacity-90 bg-crimson px-4 py-1 rounded duration-500 max-700:hidden">
              Login
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
