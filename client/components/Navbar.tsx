"use client"
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sun, Moon } from "lucide-react";
import {useTheme} from 'next-themes';
import { useEffect, useState } from "react";

export default function Navbar() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if(!mounted) return null;

  return (
    <nav>
      <section>
        <Link href={"/"}>
          <Image
            src={"/favicon.svg"}
            width={100}
            height={100}
            alt="logo"
            className="dark:bg-white rounded-full w-[50px] h-[50px]"
          />
        </Link>

        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <div>
              <span>Category</span>
              <ChevronDown />
            </div>
          </li>
          <li>
            <Link href={'/contact'}>Contact Us</Link>
          </li>
        </ul>

        {/* switch modes */}
        {theme === "light" ? <Moon onClick={() => setTheme("dark")} className="cursor-pointer text-black hover:text-slate-800 transition" /> : <Sun onClick={() => setTheme("light")} className="cursor-pointer hover:text-slate-300 text-white transition" />}

            <button>Login</button>

      </section>
    </nav>
  );
}
